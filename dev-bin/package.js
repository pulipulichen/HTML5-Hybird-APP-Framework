var shell = require('shelljs');

var _dir_name = "hybird-app-win32-x64";
var _app_name = "hybird-app";

shell.cd(__dirname);
/*
shell.cd('../www/');
shell.rm("-rf", _dir_name);
shell.exec('npm run package-win');
//shell.exec('npm run package');
//shell.rm("-rf", _dir_name + "/resources/app");
shell.cp("-R", "electron-config.json", _dir_name);

// 移動
shell.mkdir("-p", "../electron-dist/" + _app_name);
shell.mv("-f", _dir_name, "../electron-dist/" + _app_name);
shell.cd("../electron-dist/" + _app_name);
shell.cp("-R", "../../dev-bin/autoit/hybird-app.exe", "./");

// 啟動
shell.exec("hybird-app.exe");
*/

// 打包壓縮
// https://www.npmjs.com/package/node-7z
//shell.cd("../electron-dist");
/*
var Zip = require('node-7z');

var archive = new Zip();
archive.add('hyper-app-electron-dist.7z', '.gitignore', {
  m0: '=BCJ',
  m1: '=LZMA:d=21'
})
.then(function () {
  // Do stuff...
});
*/

shell.cd(__dirname + "/7-Zip64");
shell.exec('7z.exe a -mx9 -t7z ../../electron-dist/hyper-app-electron-dist.7z "../../electron-dist/hybird-app"')
//shell.exec(_app_name + '.exe electron-config.json');