import { LogCallback, LogEntry } from 'winston';
import TransportStream from 'winston-transport';
import { Counter, Registry, register as globalRegistry } from 'prom-client';
import { TransportPrometheusOptions } from './transportPrometheusOptions';

export class PrometheusTransport extends TransportStream {
    register: Registry;
    counter: Counter<string>;

    constructor(opts?: TransportPrometheusOptions) {
        super(opts);

        this.register = opts?.register ?? globalRegistry;
        this.counter = new Counter({
            name: 'winston_events_total',
            help: 'Number of logging events that made it to the logs',
            labelNames: ['level'],
            registers: [this.register],
        });
    }

    log(entry: LogEntry, callback: LogCallback) {
        setImmediate(() => this.emit('logged', entry));
        this.counter.inc({ level: entry.level });
        callback();
    }
}
