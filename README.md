# winston transport for Prometheus

## Usage

winston-transport-prometheus can be used in the same way as the winston's standard transports.

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

## Examples

Please refer to the [examples](examples) directory.

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
