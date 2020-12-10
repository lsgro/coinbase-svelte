import { readable } from 'svelte/store';

import type { Received } from './../../coinbase-ts/lib/full_data';
import { WsClient } from '../../coinbase-ts/lib/ws_client';
import { FullListener, fullClient } from './../../coinbase-ts/lib/full_client';

const MAX_MESSAGES = 100;
let totMessages = 0;
let wsc: WsClient;

const PROD_URL = "wss://ws-feed-public.sandbox.pro.coinbase.com";
const TEST_URL = "wss://ws-feed-public.sandbox.pro.coinbase.com";

class MyListener extends FullListener {
    private setFunction: (arg: any) => void;

    constructor(setFunction: (arg: any) => void) {
        super();
        this.setFunction = setFunction;
    }

    onReceived(msg: Received): void {
        this.setFunction(msg);
    }
}

export const coinbase_full = readable({}, function start(setFunction: (arg: any) => void): () => void {
    function logSet(arg: any): void {
        console.debug("Received", arg);
        setFunction(arg);
    }

    let listener = new MyListener(logSet);
    let onData = fullClient(listener);

    function onMessage(event: MessageEvent<any>) {
        totMessages++;
        if (totMessages == MAX_MESSAGES) {
            wsc.unsubscribe();
        }
        onData(event.data);
    }

    wsc = new WsClient(PROD_URL, ["BTC-USD"], ["full"], onMessage);
    wsc.open();

    return function stop() {
        wsc.close();
    };
});
