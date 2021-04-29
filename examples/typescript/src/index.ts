import express, { Request, Response } from 'express';
import promMid from 'express-prometheus-middleware';
import winston from 'winston';
import { PrometheusTransport } from '@matsumana/winston-transport-prometheus';

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.simple(),
    transports: [new winston.transports.Console(), new PrometheusTransport()],
});

const port = process.env.PORT ?? 8080;
const app = express();
app.use(
    promMid({
        collectGCMetrics: true,
        requestLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],
        responseLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],
    })
);
app.get('/', (_req: Request, res: Response) => {
    logger.info('foo');
    res.send('It works!');
});
app.listen(port, () => {
    logger.info(`Started (port=${port})`);
});
