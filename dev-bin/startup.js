var shell = require('shelljs');
const exec = require('child_process').exec;

var _dir_name = "hybird-app-win32-x64";
var _app_name = "hybird-app";

shell.cd(__dirname);
shell.cd('../electron-dist/' + _app_name);
exec(_app_name + ".exe");

process.exit();
