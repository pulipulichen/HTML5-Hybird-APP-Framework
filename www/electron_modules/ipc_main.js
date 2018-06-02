const {app, BrowserWindow, dialog, Menu, Tray, globalShortcut, ipcMain, session, shell} = require('electron');
let fs = require('fs');
var path = require('path');

module.exports = {
    setup: function () {
        ipcMain.on('save_file', (event, _filename, _filters, _content, _open) => {
            //var _filename = arg[0];
            //var content = arg[1];
            // You can obviously give a direct path without use the dialog (C:/Program Files/path/myfileexample.txt)
            dialog.showSaveDialog({
                defaultPath: _filename,
                filters: JSON.parse(_filters)
            }, (fileName) => {
                
                if (fileName === undefined) {
                    console.log("You didn't save the file");
                    return;
                }

                // fileName is a string that contains the path and filename created in the save file dialog.  
                fs.writeFileSync(fileName, _content, 'base64');
                //shell.openItem(path.dirname(fileName));
                if (_open === true) {
                    shell.openItem(fileName);
                }
            });
        }); // ipcMain.on('save-file', (event, arg)=> {

        ipcMain.on('open_window', (event, _link) => {
            shell.openExternal(_link);
        });

        ipcMain.on('retrieve_web', (event, _url, _method, _send_data, _referer, _callback_id) => {
            var _win = new BrowserWindow({show: false});
            var _load_url_setting = {
                extraHeaders: 'Referer: ' + _referer
            };

            if (_method === "post") {
                _load_url_setting["postData"] = [{
                        type: 'rawData',
                        bytes: Buffer.from(_send_data)
                    }];
            }

            _win.loadURL(_url, _load_url_setting);
            _win.webContents.once('did-finish-load', function () {
                _win.webContents.executeJavaScript('document.querySelector("html").innerHTML', true, result => {
                    event.sender.send(_callback_id, result, 200);
                });
            });

            _win.webContents.once('did-fail-load', function () {
                event.sender.send(_callback_id, "", "Load failed.");
            });
        });

        ipcMain.on('set_item', (event, _key, _item) => {
            var _file_name = __dirname + "/cache/local_storage_" + _key + ".json";
            fs.writeFile(_file_name, _item, "utf8");
        });

        ipcMain.on('get_item', (event, _key, _callback_id) => {
            var _file_name = __dirname + "/cache/local_storage_" + _key + ".json";
            fs.exists(_file_name, function (_is_exists) {
                if (_is_exists === true) {
                    fs.readFile(_file_name, "utf8", function (_err, _value) {
                        event.sender.send(_callback_id, _value);
                    });
                } else {
                    event.sender.send(_callback_id, null);
                }
            });
        });
        
        ipcMain.on('load_local_file', (event, _file, _callback_id) => {
            //var _file_name = __dirname + "/cache/local_storage_" + _key + ".json";
            fs.exists(_file, function (_is_exists) {
                if (_is_exists === true) {
                    fs.readFile(_file, function (_err, _content) {
                        _content = new Buffer(_content, 'binary').toString('base64');
                        //_content = _content.toString('base64');
                        event.sender.send(_callback_id, _content);
                    });
                } else {
                    event.sender.send(_callback_id, null);
                }
            });
        });
        
        ipcMain.on('save_local_file', (event, _file, _content) => {
            //var _file_name = __dirname + "/cache/local_storage_" + _key + ".json";
            fs.exists(_file, function (_is_exists) {
                if (_is_exists === true) {
                    fs.writeFile(_file, _content, 'base64');
                }
            });
        });
    }
};
