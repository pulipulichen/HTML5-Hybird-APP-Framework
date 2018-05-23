var shell = require('shelljs');

var _dir_name = "hybird-app-win32-x64";
var _app_name = "hybird-app";

shell.cd(__dirname);
shell.cd('../www/');
shell.rm("-rf", _dir_name);
shell.exec('npm run package-win');
shell.cp("-R", "electron-config.json", _dir_name);

// 移動
shell.mkdir("-p", "../electron-dist/" + _app_name);
shell.mv("-f", _dir_name, "../electron-dist/" + _app_name);
shell.cd("../electron-dist/" + _app_name);
shell.cp("-R", "../../dev-bin/autoit/hybird-app.exe", "./");

// 啟動
shell.exec("hybird-app.exe");

// 打包壓縮
console.log("Package to 7-zip...");

shell.cd(__dirname + "/7-Zip64");
shell.rm("-rf", "../../electron-dist/hyper-app-electron-dist.7z");
shell.exec('7z.exe a -mx9 -t7z ../../electron-dist/hyper-app-electron-dist.7z "../../electron-dist/hybird-app"')
//shell.exec(_app_name + '.exe electron-config.json');