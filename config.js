/** This file includes related configurations. */

/** Database settings */
// This project uses Supabase. You may configure your URL and key here.
// URL
export const SUPABASE_URL = 'https://itacmclavchcukaszatw.supabase.co';

// The API key. Make sure it's the anon key doesn't need to be secret.
export const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml0YWNtY2xhdmNoY3VrYXN6YXR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg1MDAyNjMsImV4cCI6MjA2NDA3NjI2M30.H-8FRmqF2HvU3bCImO2ZvU1M1J0tUy5U7E2Herco4M4';

// The maximum number of each general query (not specific date or callsign
// but the latest xxx QSOs)
export const MAX_QUERIES = 20;

/** Personal information settings */
// Your callsign. Showed on the applet.
export const CALLSIGN = 'BD7OUR';