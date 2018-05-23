main_page = {
    key: "main_page",
    data: {
        message: "Hello, world!"
    },
    methods: {
        switch_page: function (_page) {
            while (vm.$data.pageStack.length > 0) {
                vm.$data.pageStack.pop();
            }
            vm.$data.pageStack.push(_page);
            sliding_menu.methods.close();
        },
        push_page: function (_page) {
            vm.$data.pageStack.push(_page);
            sliding_menu.methods.close();
        },
        share_json_to_ods: function () {
            var _filename = "test.ods";
            var _data = {
                'global': {
                    "version": CONFIG.version,
                    "author": "布丁布丁吃布丁"
                },
                'data': [
                    {
                        col1: "1-1",
                        col2: "1-2",
                    },
                    {
                        col1: "2-1",
                        col2: "2-2",
                    },
                ]
            };
            var _content = xlsx_helper_create("ods", _filename, _data);
            
            var _filters = [
                {
                    name: "Open Document Spreadsheet",
                    extensions: ["ods"]
                }
            ];
            
            var _mime = "application/vnd.oasis.opendocument.spreadsheet";
            
            hybird_app_helper.save_as(_filename, _content, _mime, _filters);
        }
    }
};
