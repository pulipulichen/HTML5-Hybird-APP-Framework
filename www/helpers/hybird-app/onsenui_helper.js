onsenui_helper = {
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
    pop_page: function () {
        vm.$data.pageStack.pop();
    }
};