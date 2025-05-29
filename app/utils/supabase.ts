/** This file provides functions to operate Supabase objects. */
import { createClient, SupabaseClient } from "@supabase/supabase-js";

/** The configuraions. */
import { SUPABASE_URL, SUPABASE_KEY, MAX_QUERIES } from "../../config";
import { LogEntry } from "./log_entry";

class SupabaseUtils {
    supabase: SupabaseClient<any, "public", any>;

    constructor(url: string, key: string) {
        this.supabase = createClient(url, key);
    }

    /**
     * Get the final MAX_QUERIES log entries from the database.
     * @returns {LogEntry[]} An array of the latest log entries.
     * @throws {Error} If detected errors during the query.
     */
    getLatest = async (): Promise<LogEntry[]> => {
        const { data, error } = await this.supabase
            .from("logbook")
            .select()
            .order('utc', {ascending: false})
            .limit(MAX_QUERIES);
        if (error) {
            throw new Error(
                `Failed to fetch latest log entries: ${error.message}`
            );
        }
        return data as LogEntry[];
    }

    /**
     * Get the log entries of a specific day.
     * @param {string} date - The date in the format "YYYY-MM-DD".
     * @returns {LogEntry[]} An array of log entries for the specified date.
     */
    getByDate = async (date: string): Promise<LogEntry[]> => {
        const { data, error } = await this.supabase
            .from("logbook")
            .select()
            .eq('DATE(utc)', new Date(date).toISOString().split('T')[0])
            .order('utc', {ascending: true});
        if (error) {
            throw new Error(
                `Failed to fetch log entries for date ${date}: ${error.message}`
            );
        }
        return data as LogEntry[];
    }

    /**
     * Get the log entries including a specific call sign.
     * @param {string} call - The call sign to search for.
     * @returns {LogEntry[]} An array of log entries that include the call
     * sign.
     */
    getByCall = async (call: string): Promise<LogEntry[]> => {
        const { data, error } = await this.supabase
            .from("logbook")
            .select('*, position(lower($1) in lower(column_name)) as match_position',
                {count: 'exact'}
            )
            .ilike('call', `%${call}%`)
            .order('match_position', {ascending: true})
            .order('length(call)', {ascending: true});
        if (error) {
            throw new Error(
                `Failed to fetch log entries for call sign ${call}: ${error.message}`
            );
        }
        return data as unknown as LogEntry[];
    }
}

export const supabaseOper = new SupabaseUtils(SUPABASE_URL, SUPABASE_KEY);
