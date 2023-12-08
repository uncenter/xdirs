import os from 'node:os';

import { expect, test } from 'vitest';

import xdirs from '../src/index';

if (process.platform !== 'darwin') {
	test('should use macOS specification', () => {
		process.env['XDG_CONFIG_HOME'] = '';
		process.env['XDG_DATA_HOME'] = '';
		process.env['XDG_CACHE_HOME'] = '';
		process.env['XDG_STATE_HOME'] = '';

		const paths = xdirs('HelloWorld');
		const username = os.userInfo().username;

		expect(paths.data).toBe(`/Users/${username}/Library/Application Support/HelloWorld`);
		expect(paths.config).toBe(`/Users/${username}/Library/Preferences/HelloWorld`);
		expect(paths.cache).toBe(`/Users/${username}/Library/Caches/HelloWorld`);
		expect(paths.log).toBe(`/Users/${username}/Library/Logs/HelloWorld`);
		expect(paths.temp.startsWith(`/var/folders/`) && paths.temp.endsWith(`/HelloWorld`)).toBe(
			true,
		);
	});

	test('should respect user-defined XDG_*', () => {
		process.env['XDG_CONFIG_HOME'] = '/Users/USERNAME/.config';
		process.env['XDG_DATA_HOME'] = '/Users/USERNAME/.local/share';
		process.env['XDG_CACHE_HOME'] = '/Users/USERNAME/.cache';
		process.env['XDG_STATE_HOME'] = '/Users/USERNAME/.local/state';

		const paths = xdirs('HelloWorld');

		expect(paths.data).toBe('/Users/USERNAME/.local/share/HelloWorld');
		expect(paths.config).toBe('/Users/USERNAME/.config/HelloWorld');
		expect(paths.cache).toBe('/Users/USERNAME/.cache/HelloWorld');
		expect(paths.log).toBe('/Users/USERNAME/.local/state/HelloWorld');
		expect(paths.temp.startsWith(`/var/folders/`) && paths.temp.endsWith(`/HelloWorld`)).toBe(
			true,
		);
	});
}
