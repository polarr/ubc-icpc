import PocketBase from 'pocketbase';
import axios from 'axios';
import cheerio from 'cheerio';
import dayjs from 'dayjs';

// --- PocketBase Configuration ---
const pb = new PocketBase('http://127.0.0.1:8090'); // 🔁 Change if hosted remotely
const COLLECTION = 'events';

// Optional: authenticate as admin or user
async function login() {
	await pb.admins.authWithPassword('admin@example.com', 'your-password'); // or use pb.collection('users') if using user auth
}

// --- Scraping UBC ICPC ---
async function fetchPage() {
	const { data } = await axios.get('https://ubc-icpc.github.io/');
	return cheerio.load(data);
}

function isHighlighted($el: cheerio.Cheerio): boolean {
	const classNames = $el.attr('class') || '';
	return /highlight|red|blue|green|alert/.test(classNames);
}

function parseDate(text: string): string | null {
	const cleaned = text.replace(/[^a-zA-Z0-9 ,]/g, '');
	const parsed = dayjs(cleaned);
	return parsed.isValid() ? parsed.toISOString() : null;
}

async function scrapeAndUpload() {
	const $ = await fetchPage();
	const events: {
		title: string;
		date: string;
		link: string;
		description: string;
		registration: string;
	}[] = [];

	$('a').each((_, el) => {
		const $el = $(el);
		const parent = $el.closest('tr, li, div');

		if (isHighlighted(parent)) return;

		const dateText = $el.text().trim();
		const title = $el.parent().text().replace(dateText, '').trim();
		const href = $el.attr('href');

		if (!href || !dateText || !title) return;

		const parsedDate = parseDate(dateText);
		if (!parsedDate) return;

		events.push({
			title,
			date: parsedDate,
			link: href.startsWith('http') ? href : `https://ubc-icpc.github.io/${href}`,
			description: '',
			registration: ''
		});
	});

	console.log(`Found ${events.length} valid events.`);

	for (const event of events) {
		try {
			await pb.collection(COLLECTION).create(event);
			console.log(`✅ Created: ${event.title}`);
		} catch (err: any) {
			console.error(`❌ Error creating ${event.title}:`, err?.response?.data || err.message);
		}
	}
}

// Main function
(async () => {
	try {
		await login(); // comment out if your collection is public write
		await scrapeAndUpload();
	} catch (err) {
		console.error('Setup error:', err);
	}
})();
