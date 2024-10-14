import express, { Request, Response } from 'express';
import { ExpressPrometheusMiddleware } from '@matteodisabatino/express-prometheus-middleware';
import winston from 'winston';
import { PrometheusTransport } from '@matsumana/winston-transport-prometheus';
import Prometheus from 'prom-client';

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.simple(),
    transports: [
        new winston.transports.Console(),
        new PrometheusTransport({
            register: Prometheus.register,
        }),
    ],
});

const port = process.env.PORT ?? 8080;
const app = express();
const epm = new ExpressPrometheusMiddleware();

app.use(epm.handler);
app.get('/', (_req: Request, res: Response) => {
    logger.info('foo');
    res.send('It works!');
});
app.listen(port, () => {
    logger.info(`Started (port=${port})`);
});
