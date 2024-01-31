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
import { dirs } from 'xdirs';

const paths = dirs('MyApp');
```

> [!IMPORTANT]
> Unlike this package's predecessor [env-paths](https://github.com/sindresorhus/env-paths), **`xdirs` does not append a "suffix" to the name of directories passed in**. You may still want to add a suffix (e.g. `-nodejs`) to avoid conflicting with existing directories.

Pass in the name of a directory (`MyApp` in the example above) to be used in the generated path strings. Returns an object with `data`, `config`, `cache`, `log`, and `temp` properties.

> [!CAUTION]
> Paths are not checked/guaranteed to exist. Make sure to check before doing any operations to these directories.

## Output

With `XDG_*` environment variables defined, the output would look like this. The same applies on Windows, but the paths defined in the environment variables would presumably different for the Windows file system.

```ts
process.env['XDG_CONFIG_HOME'] = '/Users/USERNAME/.config';
process.env['XDG_DATA_HOME'] = '/Users/USERNAME/.local/share';
process.env['XDG_CACHE_HOME'] = '/Users/USERNAME/.cache';
process.env['XDG_STATE_HOME'] = '/Users/USERNAME/.local/state';

const paths = dirs('MyApp');
// {
//   data: "/Users/USERNAME/.local/share/MyApp",
//   config: "/Users/USERNAME/.config/MyApp",
//   cache: "/Users/USERNAME/.cache/MyApp",
//   log: "/Users/USERNAME/.local/state/MyApp",
//   temp: "/var/folders/t3/gp6fms8s4s351gc1vbtjmtrc0000gn/T/MyApp",
// }
```

_Without_ `XDG_*` environment variables defined, paths default to OS-specific standards. On macOS, this looks like the following:

```ts
process.env['XDG_CONFIG_HOME'] = '';
process.env['XDG_DATA_HOME'] = '';
process.env['XDG_CACHE_HOME'] = '';
process.env['XDG_STATE_HOME'] = '';

const paths = dirs('MyApp');
// {
//   data: "/Users/USERNAME/Library/Application Support/MyApp",
//   config: "/Users/USERNAME/Library/Preferences/MyApp",
//   cache: "/Users/USERNAME/Library/Caches/MyApp",
//   log: "/Users/USERNAME/Library/Logs/MyApp",
//   temp: "/var/folders/t3/gp6fms8s4s351gc1vbtjmtrc0000gn/T/MyApp",
// }
```

On Windows, that looks like this:

```ts
process.env['XDG_CONFIG_HOME'] = '';
process.env['XDG_DATA_HOME'] = '';
process.env['XDG_CACHE_HOME'] = '';
process.env['XDG_STATE_HOME'] = '';

const paths = dirs('MyApp');
// {
//   data: "",
//   config: "",
//   cache: "",
//   log: "",
//   temp: "",
// }
```

And since the actual standard for Linux is the [XDG Base Directory](https://specifications.freedesktop.org/basedir-spec/basedir-spec-latest.html) specification, `xdirs` first checks XDG environment variables (not configurable) and then defaults to the [default paths suggested in the standard](https://specifications.freedesktop.org/basedir-spec/basedir-spec-latest.html#variables).

## Configuration

### `macos`

-   `xdg` (default: `true`): Enable/disable the usage of XDG directories on macOS:

    ```ts
    dirs('MyApp', { macos: { xdg: false } });
    ```

### `windows`

-   `xdg` (default: `true`): Enable/disable the usage of XDG directories on Windows.

    ```ts
    dirs('MyApp', { windows: { xdg: false } });
    ```

## License

This package is derived from [`env-paths`](https://github.com/sindresorhus/env-paths). See [COPYING.md](COPYING.md).

[Licensed under the MIT License](LICENSE).
