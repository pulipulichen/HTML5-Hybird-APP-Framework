var shell = require('shelljs');

var _dir_name = "hybird-app-win32-x64";
var _app_name = "hybird-app";

shell.cd('../www/');
shell.rm("-rf", _dir_name);
shell.exec('npm run package-win');
shell.exec('npm run package');
shell.rm("-rf", _dir_name + "/resources/app");
shell.cp("-R", "../electron-config.json", "hybird-app-win32-x64");
shell.cd(_dir_name);
shell.exec(_app_name + '.exe electron-config.json');