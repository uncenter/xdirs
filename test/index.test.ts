import os from 'node:os';

import { describe, expect, test } from 'vitest';

import { dirs } from '../src/index';

const USERNAME = os.userInfo().username;
const TEST_DIR = 'MyApp';

const LINUX_DIRS = {
	data: ``,
	config: ``,
	cache: ``,
	log: ``,
	temp: ``,
};

const MACOS_DIRS = {
	data: `/Users/${USERNAME}/Library/Application Support/${TEST_DIR}`,
	config: `/Users/${USERNAME}/Library/Preferences/${TEST_DIR}`,
	cache: `/Users/${USERNAME}/Library/Caches/${TEST_DIR}`,
	log: `/Users/${USERNAME}/Library/Logs/${TEST_DIR}`,
};

const WINDOWS_DIRS = {
	data: `/Users/${USERNAME}/Library/Application Support/${TEST_DIR}`,
	config: `/Users/${USERNAME}/Library/Preferences/${TEST_DIR}`,
	cache: `/Users/${USERNAME}/Library/Caches/${TEST_DIR}`,
	log: `/Users/${USERNAME}/Library/Logs/${TEST_DIR}`,
};

if (process.platform === 'linux')
	describe('linux', () => {
		test('should use XDG specification', () => {
			process.env['XDG_DATA_HOME'] = '';
			process.env['XDG_CONFIG_HOME'] = '';
			process.env['XDG_CACHE_HOME'] = '';
			process.env['XDG_STATE_HOME'] = '';

			const paths = dirs(TEST_DIR);

			expect(paths.data).toBe(LINUX_DIRS.data);
			expect(paths.config).toBe(LINUX_DIRS.config);
			expect(paths.cache).toBe(LINUX_DIRS.cache);
			expect(paths.log).toBe(LINUX_DIRS.log);
			expect(
				paths.temp.startsWith(`/var/folders/`) && paths.temp.endsWith(`/${TEST_DIR}`),
			).toBe(true);
		});

		test('should respect user-defined XDG_*', () => {
			process.env['XDG_DATA_HOME'] = '/Users/USERNAME/.local/share';
			process.env['XDG_CONFIG_HOME'] = '/Users/USERNAME/.config';
			process.env['XDG_CACHE_HOME'] = '/Users/USERNAME/.cache';
			process.env['XDG_STATE_HOME'] = '/Users/USERNAME/.local/state';

			const paths = dirs(TEST_DIR);

			expect(paths.data).toBe(`/Users/USERNAME/.local/share/${TEST_DIR}`);
			expect(paths.config).toBe(`/Users/USERNAME/.config/${TEST_DIR}`);
			expect(paths.cache).toBe(`/Users/USERNAME/.cache/${TEST_DIR}`);
			expect(paths.log).toBe(`/Users/USERNAME/.local/state/${TEST_DIR}`);
			expect(
				paths.temp.startsWith(`/var/folders/`) && paths.temp.endsWith(`/${TEST_DIR}`),
			).toBe(true);
		});
	});

if (process.platform === 'darwin')
	describe('macos', () => {
		test('should use macOS specification', () => {
			process.env['XDG_DATA_HOME'] = '';
			process.env['XDG_CONFIG_HOME'] = '';
			process.env['XDG_CACHE_HOME'] = '';
			process.env['XDG_STATE_HOME'] = '';

			const paths = dirs(TEST_DIR);

			expect(paths.data).toBe(MACOS_DIRS.data);
			expect(paths.config).toBe(MACOS_DIRS.config);
			expect(paths.cache).toBe(MACOS_DIRS.cache);
			expect(paths.log).toBe(MACOS_DIRS.log);
			expect(
				paths.temp.startsWith(`/var/folders/`) && paths.temp.endsWith(`/${TEST_DIR}`),
			).toBe(true);
		});

		test('should respect user-defined XDG_*', () => {
			process.env['XDG_DATA_HOME'] = '/Users/USERNAME/.local/share';
			process.env['XDG_CONFIG_HOME'] = '/Users/USERNAME/.config';
			process.env['XDG_CACHE_HOME'] = '/Users/USERNAME/.cache';
			process.env['XDG_STATE_HOME'] = '/Users/USERNAME/.local/state';

			const paths = dirs(TEST_DIR);

			expect(paths.data).toBe(`/Users/USERNAME/.local/share/${TEST_DIR}`);
			expect(paths.config).toBe(`/Users/USERNAME/.config/${TEST_DIR}`);
			expect(paths.cache).toBe(`/Users/USERNAME/.cache/${TEST_DIR}`);
			expect(paths.log).toBe(`/Users/USERNAME/.local/state/${TEST_DIR}`);
			expect(
				paths.temp.startsWith(`/var/folders/`) && paths.temp.endsWith(`/${TEST_DIR}`),
			).toBe(true);
		});

		test('should ignore user-defined XDG_* when disabled', () => {
			process.env['XDG_CONFIG_HOME'] = '/Users/USERNAME/.config';
			process.env['XDG_DATA_HOME'] = '/Users/USERNAME/.local/share';
			process.env['XDG_CACHE_HOME'] = '/Users/USERNAME/.cache';
			process.env['XDG_STATE_HOME'] = '/Users/USERNAME/.local/state';

			const paths = dirs(TEST_DIR, { macos: { xdg: false } });

			expect(paths.data).toBe(MACOS_DIRS.data);
			expect(paths.config).toBe(MACOS_DIRS.config);
			expect(paths.cache).toBe(MACOS_DIRS.cache);
			expect(paths.log).toBe(MACOS_DIRS.log);
			expect(
				paths.temp.startsWith(`/var/folders/`) && paths.temp.endsWith(`/${TEST_DIR}`),
			).toBe(true);
		});
	});

if (process.platform === 'win32')
	describe('windows', () => {
		test('should use Windows "specification"', () => {
			process.env['XDG_DATA_HOME'] = '';
			process.env['XDG_CONFIG_HOME'] = '';
			process.env['XDG_CACHE_HOME'] = '';
			process.env['XDG_STATE_HOME'] = '';

			const paths = dirs(TEST_DIR);

			expect(paths.data).toBe(WINDOWS_DIRS.data);
			expect(paths.config).toBe(WINDOWS_DIRS.config);
			expect(paths.cache).toBe(WINDOWS_DIRS.cache);
			expect(paths.log).toBe(WINDOWS_DIRS.log);
			expect(
				paths.temp.startsWith(`/var/folders/`) && paths.temp.endsWith(`/${TEST_DIR}`),
			).toBe(true);
		});

		test('should respect user-defined XDG_*', () => {
			process.env['XDG_DATA_HOME'] = '/Users/USERNAME/.local/share';
			process.env['XDG_CONFIG_HOME'] = '/Users/USERNAME/.config';
			process.env['XDG_CACHE_HOME'] = '/Users/USERNAME/.cache';
			process.env['XDG_STATE_HOME'] = '/Users/USERNAME/.local/state';

			const paths = dirs(TEST_DIR);

			expect(paths.data).toBe(`/Users/USERNAME/.local/share/${TEST_DIR}`);
			expect(paths.config).toBe(`/Users/USERNAME/.config/${TEST_DIR}`);
			expect(paths.cache).toBe(`/Users/USERNAME/.cache/${TEST_DIR}`);
			expect(paths.log).toBe(`/Users/USERNAME/.local/state/${TEST_DIR}`);
			expect(
				paths.temp.startsWith(`/var/folders/`) && paths.temp.endsWith(`/${TEST_DIR}`),
			).toBe(true);
		});

		test('should ignore user-defined XDG_* when disabled', () => {
			process.env['XDG_CONFIG_HOME'] = '/Users/USERNAME/.config';
			process.env['XDG_DATA_HOME'] = '/Users/USERNAME/.local/share';
			process.env['XDG_CACHE_HOME'] = '/Users/USERNAME/.cache';
			process.env['XDG_STATE_HOME'] = '/Users/USERNAME/.local/state';

			const paths = dirs(TEST_DIR, { windows: { xdg: false } });

			expect(paths.data).toBe(WINDOWS_DIRS.data);
			expect(paths.config).toBe(WINDOWS_DIRS.config);
			expect(paths.cache).toBe(WINDOWS_DIRS.cache);
			expect(paths.log).toBe(WINDOWS_DIRS.log);
			expect(
				paths.temp.startsWith(`/var/folders/`) && paths.temp.endsWith(`/${TEST_DIR}`),
			).toBe(true);
		});
	});
