import xdirs from './src';

process.env['XDG_CONFIG_HOME'] = '';
process.env['XDG_DATA_HOME'] = '';
process.env['XDG_CACHE_HOME'] = '';
process.env['XDG_STATE_HOME'] = '';

let paths = xdirs('HelloWorld');
console.log(paths);

process.env['XDG_CONFIG_HOME'] = '/Users/USERNAME/.config';
process.env['XDG_DATA_HOME'] = '/Users/USERNAME/.local/share';
process.env['XDG_CACHE_HOME'] = '/Users/USERNAME/.cache';
process.env['XDG_STATE_HOME'] = '/Users/USERNAME/.local/state';

paths = xdirs('HelloWorld');
console.log(paths);
