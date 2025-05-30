'use client';
/** 
 * The applet to show recent QSOs and allow the user to search by date and
 * callsign.
 */

import { useState, useEffect } from "react";

import { LogEntry } from "@/app/utils/log_entry";
import { querier } from "@/app/utils/querier";
import { CALLSIGN } from "@/config";

import { Button, Input, Tag, Table, DatePicker } from 'antd';
// import type { GetProps } from "antd";
import type { TableProps } from "antd";
import '@ant-design/v5-patch-for-react-19';

import styles from './style.module.css';

// Define onSearch.
// type searchProps = GetProps<typeof Input.Search>;
// const onSearch: searchProps['onSearch'] = (value, _e, info) =>
//     console.log(info?.source, value);

// Used colors.
const RED = '#f5222d';
const ORANGE = '#fa541c';
const YELLOW = '#faad14';
const GREEN = '#a0d911';
const BLUE = '#1677ff';
const GRAY = '#bfbfbf';

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

// Generate the Antd table from the log entries list.
// function generateTable(entries: LogEntry[]) {
//     return (entries.map((entry) => {
//         return {
//             utc: entry.utc,
//             call: entry.call,
//             freq: freqFromHz(entry.freq_hz),
//             mode: entry.mode
//         }
//     }))
// }

/** The Antd table columns. */
const columns: TableProps<LogEntry>['columns'] = [
    {
        title: "UTC",
        dataIndex: "utc",
        key: "utc",
        align: "center",
        // render: (string) => {
        //     const dateNTime = string.split("T");
        //     return <>
        //         {/* {dateNTime[0]}<br />
        //         {dateNTime[1]} */}
        //     {dateNTime[0] + '\n' + dateNTime[1]}
        //     </>
        // }
    },
    {
        title: "CALL",
        dataIndex: "call",
        key: "call",
        align: "center",
    },
    {
        title: "FREQ",
        dataIndex: "freq_hz",
        key: "freq_hz",
        render: (freq_hz) => freqFromHz(freq_hz),
    },
    {
        title: "MODE",
        dataIndex: "mode",
        key: "mode",
        align: "center",
    },
    {
        title: "MY CARD",
        dataIndex: "my_card",
        key: "my_card",
        render: (_, {my_card}) => {
            let color;
            switch (my_card) {
                case "Failed to contact":
                    color = RED;
                    break;
                case "Preparing":
                    color = YELLOW;
                    break;
                case "Sent":
                    color = GREEN;
                    break;
                case "Cancelled":
                    color = GRAY;
                    break;
                default:
                    color = GRAY;
            }
            return <Tag color={color} key={my_card}>{my_card}</Tag>;
        },
        align: "center",
    },
    {
        title: "UR CARD",
        dataIndex: "your_card",
        key: "your_card",
        render: (_, {your_card}) => {
            let color;
            switch (your_card) {
                case "Not received":
                    color = RED;
                    break;
                case "Received":
                    color = GREEN;
                    break;
                default:
                    color = GRAY;
            }
            return <Tag color={color} key={your_card}>{your_card}</Tag>;
        },
        align: "center",
    },
    {
        title: "LoTW",
        dataIndex: "lotw",
        key: "lotw",
        render: (_, {lotw}) => {
            let color;
            switch (lotw) {
                case "Preparing":
                    color = ORANGE;
                    break;
                case "QSO":
                    color = BLUE;
                    break;
                case "QSL":
                    color = GREEN;
                    break;
                default:
                    color = GRAY;
            }
            return <Tag color={color} key={lotw}>{lotw}</Tag>;
        },
        align: "center",
    }
];

export default function RecentQsos() {
    // States of the log entries.
    const [entriesValue, setEntriesValue] = useState<LogEntry[]>([]);

    // States of callsign field.
    const [callsignValue, setCallsignValue] = useState("");

    // The function when a date is selected.
    const handleDateChange = async (
        _: unknown,
        datestring: string | string[]
    ) => {
        if (typeof datestring === 'string') {
            setEntriesValue(await querier.getByDate(datestring));
        }
        else {
            setEntriesValue(await querier.getByDate(datestring[0]));
        }
    }

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

    return <div id={styles.recent_qsos}>
        <div id={styles.title}>
            <div id={styles.bigtitle}>
                My recent QSOs
            </div>
            <div id={styles.subtitle}>
                {CALLSIGN}
            </div>
        </div>

        <div id="content">
            <div id={styles.toolbar}>
                {/* TODO: Date. */}
                <DatePicker
                    onChange={handleDateChange}
                    needConfirm={true}
                />

                <Input.Search
                    id="callsign-field"
                    type="text"
                    onChange={handleCallsignChange}
                    onSearch={handleCallsignSearch}
                    style={{width: "200px"}}
                    placeholder="Search by callsign"
                ></Input.Search>
                <Button
                    onClick={getInitialData}
                > See the latests
                </Button>
            </div>
            <div id={styles.table_box}>
                <Table<LogEntry>
                    columns={columns}
                    dataSource={entriesValue}
                    rowKey={(entry) => entry.id}
                    pagination={{
                        hideOnSinglePage: true,
                    }}
                />
            </div>
        </div>
        <div id={styles.source_ad}>
            Have your own logbook online! See&ensp;
            <a href="https://github.com/HeavySnowJakarta/show-your-logbook">
                the GitHub repository
            </a>.
        </div>
    </div>
}