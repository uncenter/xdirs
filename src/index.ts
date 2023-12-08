import os from 'node:os';
import path from 'node:path';
import process from 'node:process';

const homedir = os.homedir();
const tmpdir = os.tmpdir();

const { env, platform } = process;

export const macos = (directory: string) => {
	const library = path.join(homedir, 'Library');

	return {
		data: path.join(library, 'Application Support', directory),
		config: path.join(library, 'Preferences', directory),
		cache: path.join(library, 'Caches', directory),
		log: path.join(library, 'Logs', directory),
		temp: path.join(tmpdir, directory),
	};
};

export const windows = (directory: string) => {
	const appData = env.APPDATA || path.join(homedir, 'AppData', 'Roaming');
	const localAppData = env.LOCALAPPDATA || path.join(homedir, 'AppData', 'Local');

	return {
		// Data/config/cache/log invented by Sindre Sorhus's https://github.com/sindresorhus/env-paths.
		data: path.join(localAppData, directory, 'Data'),
		config: path.join(appData, directory, 'Config'),
		cache: path.join(localAppData, directory, 'Cache'),
		log: path.join(localAppData, directory, 'Log'),
		temp: path.join(tmpdir, directory),
	};
};

export const linux = (directory: string) => {
	const username = path.basename(homedir);

	return {
		data: path.join(
			env.XDG_DATA_HOME || path.join(homedir, '.local', 'share'),
			directory,
		),
		config: path.join(
			env.XDG_CONFIG_HOME || path.join(homedir, '.config'),
			directory,
		),
		cache: path.join(env.XDG_CACHE_HOME || path.join(homedir, '.cache'), directory),
		// https://wiki.debian.org/XDGBaseDirectorySpecification#state
		log: path.join(
			env.XDG_STATE_HOME || path.join(homedir, '.local', 'state'),
			directory,
		),
		temp: path.join(tmpdir, username, directory),
	};
};

// https://specifications.freedesktop.org/basedir-spec/basedir-spec-latest.html
export const xdg = (directory: string) => {
	const result: Record<string, string> = {};

	if (env.XDG_DATA_HOME) result.data = path.join(env.XDG_DATA_HOME, directory);
	if (env.XDG_CONFIG_HOME) result.config = path.join(env.XDG_CONFIG_HOME, directory);
	if (env.XDG_CACHE_HOME) result.cache = path.join(env.XDG_CACHE_HOME, directory);
	if (env.XDG_STATE_HOME) result.log = path.join(env.XDG_STATE_HOME, directory);

	return result;
};

export default function xdirs(directory: string) {
	if (typeof directory !== 'string') {
		throw new TypeError(`Expected a string, got ${typeof directory}`);
	}

	switch (platform) {
		case 'darwin': {
			return { ...macos(directory), ...xdg(directory) };
		}
		case 'win32': {
			return { ...windows(directory), ...xdg(directory) };
		}
		default: {
			return linux(directory);
		}
	}
}
