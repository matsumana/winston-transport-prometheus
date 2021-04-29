# winston transport for Prometheus

[![npm version](https://img.shields.io/npm/v/%2540matsumana%252Fwinston-transport-prometheus)![Dependencies](https://img.shields.io/david/matsumana/winston-transport-prometheus)![npm downloads](https://img.shields.io/npm/dm/@matsumana/winston-transport-prometheus)](https://www.npmjs.com/package/@matsumana/winston-transport-prometheus)

[![CircleCI](https://circleci.com/gh/matsumana/winston-transport-prometheus/tree/main.svg?style=shield)](https://app.circleci.com/pipelines/github/matsumana/winston-transport-prometheus?branch=main)
[![Known Vulnerabilities](https://snyk.io/test/github/matsumana/winston-transport-prometheus/badge.svg)](https://snyk.io/test/github/matsumana/winston-transport-prometheus)

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
