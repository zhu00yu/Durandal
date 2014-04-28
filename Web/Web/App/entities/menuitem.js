define(['services/datacontext', 'plugins/router'],
    function (datacontext, router) {

        var menuItem = function (hash, title, submenus, symbol) {
            var self = this;
            self.hash = hash;
            self.submenus = submenus;
            self.isActive = ko.computed(function () {
                var currentRouter = router.activeInstruction();
                var fragment = currentRouter.fragment;
                return self.hash == ("#" + fragment);
            });
            self.title = ko.computed(function () {
                if (self.submenus) {
                    return title + symbol;
                } else {
                    return title;
                }
            });
        };

        return menuItem;
    });