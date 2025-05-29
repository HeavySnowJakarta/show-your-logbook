/** This file combines Supabase and Redis in the future together to simplify
 * the operation of queries.
 */

import { supabaseOper } from "./supabase";

class Querier {
    supabase: typeof supabaseOper;

    constructor() {
        this.supabase = supabaseOper;
    }

    /** Get the latest log entries from the database.
     * @returns {Promise<LogEntry[]>} An array of the latest log entries.
     * @throws {Error} If detected errors during the query.
     */
    getLatest = async () => {
        return await this.supabase.getLatest();
    }

    /** Get the log entries of a specific day.
     * @param {string} date - The date in the format "YYYY-MM-DD".
     * @returns {Promise<LogEntry[]>} An array of log entries for the specified date.
     * @throws {Error} If detected errors during the query.
     */
    getByDate = async (date: string) => {
        return await this.supabase.getByDate(date);
    }

    /** Get the log entries including a specific call sign.
     * @param {string} call - The call sign to search for.
     * @returns {Promise<LogEntry[]>} An array of log entries that include the call sign.
     * @throws {Error} If detected errors during the query.
     */
    getByCall = async (call: string) => {
        return await this.supabase.getByCall(call);
    }
}

export const querier = new Querier();