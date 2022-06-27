# x-chalk

A modest wrapper around `chalk` so I don't have to wrap every call to `chalk` with
`console.log`. Exports most common colors, and also re-exports chalk as `c` for
convenience.

```js
import { red, blue, log, c } from 'x-chalk';

red(`This will log in red!`);
blue.dim(`This will log in dim blue!`);
log(c`{yellow fancy chalk stuff} {green is fun!}`);
```
