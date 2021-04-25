import * as winston from 'winston';
import { Counter, register } from 'prom-client';
import { PrometheusTransport } from '../lib';

let sut: PrometheusTransport;

beforeEach(() => {
    const metric = register.getSingleMetric('winston_events_total');
    if (metric) {
        register.removeSingleMetric('winston_events_total');
    }
    sut = new PrometheusTransport();
});

describe('PrometheusTransport', () => {
    it('call log() with debug, one time', async () => {
        sut.log({ level: 'debug', message: 'foo' }, () => {
            // do nothing
        });

        const actual = register.getSingleMetric('winston_events_total');
        expect(actual).toBeInstanceOf(Counter);

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const metrics = await actual.get();
        expect(metrics.values.length).toBe(1);

        const metric = metrics.values[0];
        expect(metric.labels).toEqual({ level: 'debug' });
        expect(metric.value).toBe(1);
    });

    it('call log() with error, multiple times', async () => {
        for (let i = 0; i < 5; i++) {
            sut.log({ level: 'error', message: 'foo' }, () => {
                // do nothing
            });
        }

        const actual = register.getSingleMetric('winston_events_total');
        expect(actual).toBeInstanceOf(Counter);

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const metrics = await actual.get();
        expect(metrics.values.length).toBe(1);

        const metric = metrics.values[0];
        expect(metric.labels).toEqual({ level: 'error' });
        expect(metric.value).toBe(5);
    });

    it('call log() multiple log levels', async () => {
        sut.log({ level: 'debug', message: 'foo' }, () => {
            // do nothing
        });
        sut.log({ level: 'info', message: 'bar' }, () => {
            // do nothing
        });
        for (let i = 0; i < 3; i++) {
            sut.log({ level: 'error', message: 'foo' }, () => {
                // do nothing
            });
        }

        const actual = register.getSingleMetric('winston_events_total');
        expect(actual).toBeInstanceOf(Counter);

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const metrics = await actual.get();
        expect(metrics.values.length).toBe(3);

        const debug = metrics.values[0];
        expect(debug.labels).toEqual({ level: 'debug' });
        expect(debug.value).toBe(1);

        const info = metrics.values[1];
        expect(info.labels).toEqual({ level: 'info' });
        expect(info.value).toBe(1);

        const error = metrics.values[2];
        expect(error.labels).toEqual({ level: 'error' });
        expect(error.value).toBe(3);
    });

    it('call log() with winston Logger', async () => {
        const logger = winston.createLogger({
            level: 'info',
            format: winston.format.simple(),
            transports: [new winston.transports.Console(), sut],
        });

        logger.debug('foo'); // since level is info (see above), will be excluded
        logger.info('bar');
        logger.warn('baz');
        logger.log('warn', 'qux');
        logger.error('quux');
        logger.error('corge');
        logger.log('error', 'grault');

        const actual = register.getSingleMetric('winston_events_total');
        expect(actual).toBeInstanceOf(Counter);

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const metrics = await actual.get();
        expect(metrics.values.length).toBe(3);

        const info = metrics.values[0];
        expect(info.labels).toEqual({ level: 'info' });
        expect(info.value).toBe(1);

        const warn = metrics.values[1];
        expect(warn.labels).toEqual({ level: 'warn' });
        expect(warn.value).toBe(2);

        const error = metrics.values[2];
        expect(error.labels).toEqual({ level: 'error' });
        expect(error.value).toBe(3);
    });
});
