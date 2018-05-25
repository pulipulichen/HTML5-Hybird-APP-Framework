electron_helper = {
    enable: false,
    setup_electron: function () {
        try {
            window.nodeRequire = require;
            //delete window.require;
            delete window.exports;
            delete window.module;
            electron = require('electron');
            ipcRenderer = electron.ipcRenderer;
            this.enable = true;
            return true;
        } catch (_e) {
            return false;
        }
    },
    retrieve_web: function (_url, _method, _send_data, _referer, _callback) {
        if (typeof (_callback) !== "function") {
            return false;
        }

        var _send_data_string = [];
        for (var _key in _send_data) {
            _send_data_string.push(_key + "=" + _send_data[_key]);
        }
        _send_data_string = _send_data_string.join("&");

        var _callback_id = "retrieve_web_callback_" + hybird_app_helper.create_uuid();

        ipcRenderer.on(_callback_id, function (event, _response, _status) {
            _callback(_response, _status);
        });

        ipcRenderer.send('retrieve_web', _url, _method, _send_data, _referer, _callback_id);
    },
    set_item: function (_key, _value) {
        if (typeof (_value) !== 'string' && typeof (_value) !== 'number') {
            _value = JSON.stringify(_value);
        }
        ipcRenderer.send('set_item', _key, _value);
    },
    get_item: function (_key, _callback) {
        var _callback_id = "get_item_callback_" + hybird_app_helper.create_uuid();
        ipcRenderer.on(_callback_id, function (event, _value) {
            //console.log("有回來嗎");
            _callback(_value);
        });
        //console.log([_callback_id, _key]);
        ipcRenderer.send('get_item', _key, _callback_id);
    },
};

electron_helper.setup_electron();
