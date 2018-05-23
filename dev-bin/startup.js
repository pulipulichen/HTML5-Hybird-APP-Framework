var shell = require('shelljs');

var _dir_name = "hybird-app-win32-x64";
var _app_name = "hybird-app";

shell.cd('../www/' + _dir_name);
shell.exec(_app_name + '.exe electron-config.json');