# winston transport for Prometheus

[![CircleCI](https://circleci.com/gh/matsumana/winston-transport-prometheus/tree/main.svg?style=shield)](https://app.circleci.com/pipelines/github/matsumana/winston-transport-prometheus?branch=main)

## Exported metrics

| name                 | metrics type | label |
|----------------------|--------------|-------|
| winston_events_total | counter      | level |

e.g.

```
# HELP winston_events_total Number of logging events that made it to the logs
# TYPE winston_events_total counter
winston_events_total{level="info"} 3
```

## Usage

winston-transport-prometheus can be used in the same way as the winston's standard transports.

*Please refer to the [examples](examples) directory for more details

e.g.

```typescript
import winston from 'winston';
import { PrometheusTransport } from '@matsumana/winston-transport-prometheus';

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.simple(),
    transports: [new winston.transports.Console(), new PrometheusTransport()],
});
```

PrometheusTransport's options as follows.

```typescript
const myRegister = new Registry();
const prometheusTransport = new PrometheusTransport({ register: myRegister });
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.simple(),
    transports: [new winston.transports.Console(), prometheusTransport],
});
```

<br>

---

## How to run the commands for test and build

### fix source files using prettier and eslint

```
$ yarn fix
```

### run lint using prettier and eslint

```
$ yarn lint
```

### run tests

```
$ yarn test
```

### build

```
$ yarn build
```
