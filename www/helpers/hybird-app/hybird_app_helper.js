hybird_app_helper = {
    open_window: function (_link, _target) {
        if (_target === undefined) {
            _target = "_blank";
        }

        if (typeof (ipcRenderer) === "undefined") {
            window.open(_link, _target);
        } else {
            ipcRenderer.send('open_window', _link);
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

        var _callback_id = "retrieve_web_callback_" + this.create_uuid();

        ipcRenderer.on(_callback_id, function (event, _response, _status) {
            _callback(_response, _status);
        });

        ipcRenderer.send('retrieve_web', _url, _method, _send_data, _referer, _callback_id);
    },
    uuid: 0,
    create_uuid: function () {
        var _uuid = this.uuid;
        this.uuid++;
        return _uuid;
    },
    set_item: function (_key, _value) {
        if (typeof (_value) !== 'string' && typeof (_value) !== 'number') {
            _value = JSON.stringify(_value);
        }
        ipcRenderer.send('set_item', _key, _value);
    },
    get_item: function (_key, _callback) {
        var _callback_id = "get_item_callback_" + this.create_uuid();
        ipcRenderer.on(_callback_id, function (event, _value) {
            //console.log("有回來嗎");
            _callback(_value);
        });
        //console.log([_callback_id, _key]);
        ipcRenderer.send('get_item', _key, _callback_id);
    },
    console_log: function (_msg) {
        console.log(_msg);
    },
    mode: 'web',
    detect_mode: function () {
        if (ELECTRON_ENABLE === true) {
            this.mode = 'electron';
        }
        else if (this.isPhoneGap()) {
            this.mode = 'mobile';
        }
    },
    setup_mode: function () {
        if (ELECTRON_ENABLE === true) {
            this.mode = 'electron';
        }
        else {
            this.mode = 'web';
        }
    },
    /**
     * @author https://stackoverflow.com/a/13252184
     * @returns {Boolean}
     */
    isPhoneGap: function () {
        return (window.cordova || window.PhoneGap || window.phonegap) 
        && /^file:\/{3}[^\/]/i.test(window.location.href) 
        && /ios|iphone|ipod|ipad|android/i.test(navigator.userAgent);
    },
    /**
     * 
     * @param {type} _filename
     * @param {type} _content Base64 format
     * @param {type} _mime
     * @param {type} _filters for Electron
     * @returns {undefined}
     */
    save_as: function (_filename, _content, _mime, _filters) {
        //this.console_log([_filename, _content]);
        switch (this.mode) {
            case 'web': 
                var blob = this.b64toFile(_content, _filename, _mime);
                saveAs(blob, _filename);
                break;
            case 'electron':
                ipcRenderer.send('save_file', _filename, JSON.stringify(_filters), _content);
                break;
        }
    },

    /**
     * @author https://stackoverflow.com/a/46405969
     * @param {type} dataURI
     * @returns {Blob}
     */
    b64toFile: function (b64Data, filename, contentType) {
        var sliceSize = 512;
        var byteCharacters = atob(b64Data);
        var byteArrays = [];

        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);
            var byteNumbers = new Array(slice.length);

            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
            var byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
        var file = new File(byteArrays, filename, {type: contentType});
        return file;
    }
};

setTimeout(function () {
    hybird_app_helper.detect_mode();
}, 0);