# xdirs

Get data, config, cache, log, and temp paths. Implements OS-specific paths but respects user-defined `XDG_*` paths when available (by default, to configure see [Configuration](#configuration)).

## Installation

```sh
npm i xdirs
pnpm add xdirs
yarn add xdirs
bun add xdirs
```

## Usage

```ts
import xdirs from 'xdirs';

const paths = xdirs('MyApp');
```

Pass in the name of a directory (`MyApp` in the example above) to be used in the generated path strings. Returns an object with `data`, `config`, `cache`, `log`, and `temp` properties.

> [!IMPORTANT]
> Unlike this package's [predecessor](https://github.com/sindresorhus/env-paths), **`xdirs` does not append a "suffix" to the name of directories passed in**. You may still want to add a suffix (e.g. `-nodejs`) to avoid conflicting with existing directories.

## Output

### macOS

**With*out* `XDG_*` environment variables defined:**

```ts
process.env['XDG_CONFIG_HOME'] = '';
process.env['XDG_DATA_HOME'] = '';
process.env['XDG_CACHE_HOME'] = '';
process.env['XDG_STATE_HOME'] = '';

const paths = xdirs('MyApp');
// {
//   data: "/Users/USERNAME/Library/Application Support/MyApp",
//   config: "/Users/USERNAME/Library/Preferences/MyApp",
//   cache: "/Users/USERNAME/Library/Caches/MyApp",
//   log: "/Users/USERNAME/Library/Logs/MyApp",
//   temp: "/var/folders/t3/gp6fms8s4s351gc1vbtjmtrc0000gn/T/MyApp",
// }
```

**With `XDG_*` environment variables defined:**

```ts
process.env['XDG_CONFIG_HOME'] = '/Users/USERNAME/.config';
process.env['XDG_DATA_HOME'] = '/Users/USERNAME/.local/share';
process.env['XDG_CACHE_HOME'] = '/Users/USERNAME/.cache';
process.env['XDG_STATE_HOME'] = '/Users/USERNAME/.local/state';

const paths = xdirs('MyApp');
// {
//   data: "/Users/USERNAME/.local/share/MyApp",
//   config: "/Users/USERNAME/.config/MyApp",
//   cache: "/Users/USERNAME/.cache/MyApp",
//   log: "/Users/USERNAME/.local/state/MyApp",
//   temp: "/var/folders/t3/gp6fms8s4s351gc1vbtjmtrc0000gn/T/MyApp",
// }
```

## Configuration

### `macos`

-   `xdg` (default: `true`): Enable/disable the usage of XDG directories on macOS:

    ```ts
    xdirs('MyApp', { macos: { xdg: false } });
    ```

### `windows`

-   `xdg` (default: `true`): Enable/disable the usage of XDG directories on Windows.

    ```ts
    xdirs('MyApp', { windows: { xdg: false } });
    ```

## License

This package is derived from [`env-paths`](https://github.com/sindresorhus/env-paths). See [COPYING.md](COPYING.md).

[Licensed under the MIT License](LICENSE).
