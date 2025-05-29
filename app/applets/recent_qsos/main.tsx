/** 
 * The applet to show recent QSOs and allow the user to search by date and
 * callsign.
 */

import { CALLSIGN } from "@/config";

export default function RecentQsos() {
    return <div id="recent-qsos">
        <div id="recent-qsos-title">
            <div id="recent-qsos-bigtitle">
                My recent QSOs
            </div>
            <div id="recent-qsos-subtitle">
                {CALLSIGN}
            </div>
        </div>

        <div id="recent-qsos-content">
            <div id="recent-qsos-toolbar"></div>
            <div id="recent-qsos-table"></div>
        </div>
        <div id="source-ad"></div>
    </div>
}