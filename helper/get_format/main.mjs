import { createClient } from "@supabase/supabase-js";;
import { SUPABASE_URL, SUPABASE_KEY } from "../../config.js";

async function main() {
    // Test the net.
    console.log("Now test the net...");
    try {
        const response = await fetch('https://itacmclavchcukaszatw.supabase.co');
        console.log("Got response. checking...")
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        console.log('Network connectivity test passed:', response.status);
        console.log('Basic connectivity test:', response.ok);
    } catch (error) {
        console.error('Network connectivity issue:', error);
    }

    // The database test.
    console.log("Now test the database...");
    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
    supabase
        .from('logbook')
        .select('*')
        .then(({ data, error }) => {
            if (error) {
                console.error("Error fetching data:", error);
            }
            else {
                console.log("Data fetched successfully:", data);
                console.log("Type of data: ", typeof data);
            }
        });
}

main();