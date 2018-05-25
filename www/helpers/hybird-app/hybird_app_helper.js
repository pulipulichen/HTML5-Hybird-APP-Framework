hybird_app_helper = {
    platform: 'web',
    detect_mode: function () {
        if (electron_helper.enable === true) {
            this.platform = 'electron';
        }
        else if (cordova_helper.isPhoneGap()) {
            this.platform = 'mobile';
        }
        else {
            this.platform = "web";
        }
        var _class_name = "platform-" + this.platform;
        setTimeout(function () {
            document.body.classList.add(_class_name);
        }, 0);
        return this.platform;
    },
    // ----------------------
    
    open_window: function (_link, _target) {
        var _this = this;
        if (this.platform === "electron") {
            ipcRenderer.send('open_window', _link);
        }
        else if (this.platform === "mobile") {
            //window.open(_link, "_system");
            //navigator.app.loadUrl(_link, { openExternal:true });
            if (typeof(cordova) !== "object" 
                    || typeof(cordova.InAppBrowser) !== "object"
                    || typeof(cordova.InAppBrowser.open) !== "function") {
                setTimeout(function () {
                    _this.open_window(_link);
                }, 100);
            }
            else {
                cordova.InAppBrowser.open(_link, "_system");
            }
        }
        else {
            if (_target === undefined) {
                _target = "_blank";
            }
            window.open(_link, _target);
        }
    },
    
    uuid: 0,
    create_uuid: function () {
        var _uuid = this.uuid;
        this.uuid++;
        return _uuid;
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
        //var _this = this;
        switch (this.platform) {
            case 'electron':
                ipcRenderer.send('save_file', _filename, JSON.stringify(_filters), _content, true);
                break;
            case 'mobile':
                cordova_helper.write_file(_filename, _content, _mime, function (nativePath) {
                    window.plugins.socialsharing.share(_filename, _filename, nativePath);
                });
                //window.plugins.socialsharing.share(null, _filename, 'data:' + _mime + ';base64,' + _content, null);
                break;
            default:    // 'web'
                var blob = PULI_UTILS.b64toFile(_content, _filename, _mime);
                saveAs(blob, _filename);
                break;
        }
    },
    // -----------
    
};