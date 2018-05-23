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
        }
    }
};
