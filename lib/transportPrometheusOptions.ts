import { TransportStreamOptions } from 'winston-transport';
import { Registry } from 'prom-client';

export interface TransportPrometheusOptions extends TransportStreamOptions {
    register: Registry;
}
