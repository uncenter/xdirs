# xdirs

Get data, config, cache, log, and temp paths. Implements OS-specific paths but respects user-defined `XDG_*` paths when available.

## Usage

```sh
npm i xdirs
pnpm add xdirs
yarn add xdirs
bun add xdirs
```

```ts
import xdirs from 'xdirs';

const paths = xdirs('HelloWorld');
```

## Preview

### macOS

**With*out* `XDG_*` environment variables defined:**

```ts
process.env['XDG_CONFIG_HOME'] = '';
process.env['XDG_DATA_HOME'] = '';
process.env['XDG_CACHE_HOME'] = '';
process.env['XDG_STATE_HOME'] = '';

const paths = xdirs('HelloWorld');
// {
//   data: "/Users/USERNAME/Library/Application Support/HelloWorld",
//   config: "/Users/USERNAME/Library/Preferences/HelloWorld",
//   cache: "/Users/USERNAME/Library/Caches/HelloWorld",
//   log: "/Users/USERNAME/Library/Logs/HelloWorld",
//   temp: "/var/folders/t3/gp6fms8s4s351gc1vbtjmtrc0000gn/T/HelloWorld",
// }
```

**With `XDG_*` environment variables defined:**

```ts
process.env['XDG_CONFIG_HOME'] = '/Users/USERNAME/.config';
process.env['XDG_DATA_HOME'] = '/Users/USERNAME/.local/share';
process.env['XDG_CACHE_HOME'] = '/Users/USERNAME/.cache';
process.env['XDG_STATE_HOME'] = '/Users/USERNAME/.local/state';

const paths = xdirs('HelloWorld');
// {
//   data: "/Users/USERNAME/.local/share/HelloWorld",
//   config: "/Users/USERNAME/.config/HelloWorld",
//   cache: "/Users/USERNAME/.cache/HelloWorld",
//   log: "/Users/USERNAME/.local/state/HelloWorld",
//   temp: "/var/folders/t3/gp6fms8s4s351gc1vbtjmtrc0000gn/T/HelloWorld",
// }
```

## License

[MIT](LICENSE)
