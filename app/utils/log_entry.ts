/** This file defines the data structure of parsed data. */

export class LogEntry {
    id: string;
    call: string;
    // TODO: Timestamp
    utc: string;
    freq_hz: number;
    mode: string;
    // Generally 'Failed to contact', 'Preparing', 'Sent' or 'Cancelled'.
    my_card: string | null;
    // Generally 'Not received' or 'Received'.
    your_card: string | null;
    // Generally 'Preparing', 'QSO' or 'QSL'.
    lotw: string | null;

    constructor(
        id: string,
        call: string,
        utc: string,
        freq_hz: number,
        mode: string,
        my_card: string | null = null,
        your_card: string | null = null,
        lotw: string | null = null
    ){
        this.id = id;
        this.call = call;
        this.utc = utc;
        this.freq_hz = freq_hz;
        this.mode = mode;
        this.my_card = my_card;
        this.your_card = your_card;
        this.lotw = lotw;
    }
}