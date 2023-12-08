import os from 'node:os';
import path from 'node:path';
import process from 'node:process';

const homedir = os.homedir();
const tmpdir = os.tmpdir();

const { env, platform } = process;

export const macos = (dir: string) => {
	const library = path.join(homedir, 'Library');

	return {
		data: path.join(library, 'Application Support', dir),
		config: path.join(library, 'Preferences', dir),
		cache: path.join(library, 'Caches', dir),
		log: path.join(library, 'Logs', dir),
		temp: path.join(tmpdir, dir),
	};
};

export const windows = (dir: string) => {
	const appData = env.APPDATA || path.join(homedir, 'AppData', 'Roaming');
	const localAppData = env.LOCALAPPDATA || path.join(homedir, 'AppData', 'Local');

	return {
		// Data/config/cache/log invented by Sindre Sorhus's https://github.com/sindresorhus/env-paths.
		data: path.join(localAppData, dir, 'Data'),
		config: path.join(appData, dir, 'Config'),
		cache: path.join(localAppData, dir, 'Cache'),
		log: path.join(localAppData, dir, 'Log'),
		temp: path.join(tmpdir, dir),
	};
};

export const linux = (dir: string) => {
	const username = path.basename(homedir);

	return {
		data: path.join(homedir, '.local', 'share', dir),
		config: path.join(homedir, '.config', dir),
		cache: path.join(homedir, '.cache', dir),
		log: path.join(homedir, '.local', 'state', dir),
		temp: path.join(tmpdir, username, dir),
	};
};

// https://specifications.freedesktop.org/basedir-spec/basedir-spec-latest.html
export const xdg = (dir: string) => {
	const result: Record<string, string> = {};

	if (env.XDG_DATA_HOME) result.data = path.join(env.XDG_DATA_HOME, dir);
	if (env.XDG_CONFIG_HOME) result.config = path.join(env.XDG_CONFIG_HOME, dir);
	if (env.XDG_CACHE_HOME) result.cache = path.join(env.XDG_CACHE_HOME, dir);
	// https://wiki.debian.org/XDGBasedirSpecification#state
	if (env.XDG_STATE_HOME) result.log = path.join(env.XDG_STATE_HOME, dir);

	return result;
};

export default function xdirs(dir: string): {
	data: string;
	config: string;
	cache: string;
	log: string;
	temp: string;
} {
	if (typeof dir !== 'string') {
		throw new TypeError(`Expected a string, got ${typeof dir}`);
	}

	switch (platform) {
		case 'darwin': {
			return { ...macos(dir), ...xdg(dir) };
		}
		case 'win32': {
			return { ...windows(dir), ...xdg(dir) };
		}
		default: {
			return linux(dir);
		}
	}
}
