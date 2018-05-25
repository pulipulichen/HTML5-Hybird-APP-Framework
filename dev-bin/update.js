var shell = require('shelljs');
const exec = require('child_process').exec;

var _app_name = "hybird-app";

shell.cd(__dirname);
shell.cd('../www/');

var _dir_name = "hybird-app-win32-x64";
var _app_dir_path = "../electron-dist/" + _app_name + "/" + _dir_name + "/resources/app";
shell.rm("-rf", _app_dir_path);
shell.mkdir("-p", _app_dir_path);
shell.cp("-R", "*", _app_dir_path);

shell.cd("../electron-dist/" + _app_name);
exec(_app_name + ".exe");
