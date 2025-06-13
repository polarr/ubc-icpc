import PocketBase from 'pocketbase';

const POCKETBASE_URL = import.meta.env.VITE_POCKETBASE_URL;
const pb = new PocketBase(POCKETBASE_URL);

// disable autocancellation so that we can handle async requests from multiple users
pb.autoCancellation(false);

export default pb;
