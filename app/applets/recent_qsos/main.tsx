/** 
 * The applet to show recent QSOs and allow the user to search by date and
 * callsign.
 */

import { useState, useEffect } from "react";

import { LogEntry } from "@/app/utils/log_entry";
import { querier } from "@/app/utils/querier";
import { CALLSIGN } from "@/config";

function freqFromHz(freqHz: number): string {
    if (freqHz >= 1e9) {
        return `${(freqHz / 1e9).toFixed(3)} GHz`;
    } else if (freqHz >= 1e6) {
        return `${(freqHz / 1e6).toFixed(3)} MHz`;
    } else if (freqHz >= 1e3) {
        return `${(freqHz / 1e3).toFixed(3)} kHz`;
    } else {
        return `${freqHz} Hz`;
    }
}

export default function RecentQsos() {
    // States of the log entries.
    const [entriesValue, setEntriesValue] = useState<LogEntry[]>([]);

    // States of callsign field.
    const [callsignValue, setCallsignValue] = useState("");

    // The function when the field of name has been changed.
    const handleCallsignChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setCallsignValue(event.target.value);
    };

    // The function when the button of search by callsign has been clicked.
    const handleCallsignSearch = async () => {
        setEntriesValue(await querier.getByCall(callsignValue));
    }

    // The function to get the initial data.
    const getInitialData = async () => {
        setEntriesValue(await querier.getLatest());
    }

    // Initial loading.
    useEffect(() => {
        getInitialData();
    }, []);

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
            <div id="recent-qsos-toolbar">
                {/* TODO: Date. */}
                {/* Search by callsign. */}
                <input
                    id="recent-qsos-callsign-field"
                    type="text"
                    value={callsignValue}
                    onChange={handleCallsignChange}
                    placeholder="Your call"
                />
                <button
                    onClick={handleCallsignSearch}
                >
                    See the call
                </button>
                <button
                    onClick={getInitialData}
                > See the latests
                </button>
            </div>
            <div id="recent-qsos-table-box">
                <table id="recent-qsos-table">
                    <thead id="recent-qsos-table-head">
                        <tr>
                            <th className="header">UTC</th>
                            <th className="header">CALL</th>
                            <th className="header">FREQ</th>
                            <th className="header">MODE</th>
                            <th className="header">MY CARD</th>
                            <th className="header">UR CARD</th>
                            <th className="header">LoTW</th>
                        </tr>
                    </thead>
                    <tbody>
                        {entriesValue.map((entry) => (
                            <tr key={entry.id}>
                                <td className="utc">{entry.utc}</td>
                                <td className="call">{entry.call}</td>
                                <td className="freq">
                                    {freqFromHz(entry.freq_hz)}
                                </td>
                                <td className="mode">{entry.mode}</td>
                                <td className={`my-card ${entry.my_card}`}>
                                    {entry.my_card ?? "Null"}
                                </td>
                                <td className={`ur-card ${entry.your_card}`}>
                                    {entry.your_card ?? "Null"}
                                </td>
                                <td className={`lotw ${entry.lotw}`}>
                                    {entry.lotw ?? "Null"}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        <div id="source-ad">
            Have your own logbook online at
            github:Heavysnowjakarta/show-your-logbook
        </div>
    </div>
}