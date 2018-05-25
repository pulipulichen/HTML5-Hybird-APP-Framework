hybird_app_loader = {
    controllers: {},
    
    // -------------
    
    ready: function () {
        var _this = this;
        var _loop = function (_i) {
            if (_i < CONFIG.controllers.length) {
                var _name = CONFIG.controllers[_i];
                PULI_UTILS.load_css("controllers/" + _name + ".css");
                //console.log(_name);
                $.getScript("controllers/" + _name + ".js", function () {
                    $.get("controllers/" + _name + ".html", function (_template) {

                        var _vm = {};
                        try {
                            eval("var _vm = " + _name);
                        } catch (_e) {
                            _vm.key = _name;
                        }
                        _vm.template = _template;
                        //console.log(_name);
                        _this.controllers[_name] = _vm;
                        //console.log(_this.controllers);
                        _i++;
                        _loop(_i);
                    });
                });
            } else {
                //console.log("ok 1");
                
                _this.load_controller_template(function (_template) {
                    var _vue_setting = _this.build_vue_setting();
                    _vue_setting.template = _template;
                    _vue_setting.created = _this.vue_create();
                    vm = new Vue(_vue_setting);
                });
            }
        };

        _loop(0);
    },
    
    build_vue_setting: function () {
        var _first_controller_name = CONFIG.controllers[0];
        var _first_controller = this.controllers[_first_controller_name];

        var _vue_setting = {
            el: '#app',
            data: {
                pageStack: [_first_controller],
                sliding_menu: sliding_menu
            }
            //created: _callback
        };
        
        return _vue_setting;
    },
    load_controller_template: function (_callback) {
        //console.log("load_controller_template 1 ");
        $.get('core/hybird_app_loader.html', function (_controller_template) {
            //console.log("load_controller_template 2");
            $.get('controllers/sliding_menu.html', function (_sliding_menu_template) {
                //console.log("load_controller_template 3");
                _controller_template = _controller_template.replace('<v-ons-splitter-side />', _sliding_menu_template);
                //console.log("load_controller_template 4");
                _callback(_controller_template);
            });
        });
    },
    
    vue_create: function () {
        var _this = hybird_app_loader;
        $(function () {
            // 先把每個controller的ready做完
            //console.log(_this.controllers);
            for (var _name in _this.controllers) {
                //console.log(_name);
                var _controller = _this.controllers[_name];
                if (typeof (_controller.methods) === "object"
                        && typeof (_controller.methods.ready) === "function") {
                    _controller.methods.ready();
                }
            }

            vue_create_event();
            
            //_backspace_bind();
            document.title = i18n.t("TITLE");
            setTimeout(function () {
                hybird_app_loader.detect_platform();
                $("body").removeClass("loading");
            }, 0);
        });
    },
    detect_platform: function () {
        var _platform = vm.$ons.platform;
        var _body = $("body");
        var _classname_prefix = "platform-";
        if (_platform.isWebView()) {
            _body.addClass(_classname_prefix + "webview");
        }
        if (_platform.isIPhone() || _platform.isIPhoneX()) {
            _body.addClass(_classname_prefix + "iphone");
        }
        if (_platform.isIPad()) {
            _body.addClass(_classname_prefix + "ipad");
        }
        if (_platform.isIOS()) {
            _body.addClass(_classname_prefix + "ios");
        }
        if (_platform.isIOSSafari()) {
            _body.addClass(_classname_prefix + "ios-safari");
        }
        if (_platform.isAndroidPhone()) {
            _body.addClass(_classname_prefix + "android-phone");
        }
        if (_platform.isAndroidTablet()) {
            _body.addClass(_classname_prefix + "android-tablet");
        }
        if (_platform.isAndroid()) {
            _body.addClass(_classname_prefix + "android");
        }
        if (_platform.isBlackBerry()) {
            _body.addClass(_classname_prefix + "black-berry");
        }
        if (_platform.isOpera()) {
            _body.addClass(_classname_prefix + "opera");
        }
        if (_platform.isFirefox()) {
            _body.addClass(_classname_prefix + "firefox");
        }
        if (_platform.isSafari()) {
            _body.addClass(_classname_prefix + "safari");
        }
        if (_platform.isChrome()) {
            _body.addClass(_classname_prefix + "chrome");
        }
        if (_platform.isIE()) {
            _body.addClass(_classname_prefix + "ie");
        }
        if (_platform.isEdge()) {
            _body.addClass(_classname_prefix + "edge");
        }
    }
};

if (hybird_app_helper.detect_mode() === "mobile") {
    document.addEventListener("deviceready",function () {
        //alert("READY 0250");
        //alert(cordova.file);
        hybird_app_loader.ready();
    }, false);
}
else {
    hybird_app_loader.ready();
}