define(['services/datacontext', 'plugins/router', 'services/helper', 'entities/menuitem'],
    function (datacontext, router, helper, menuItem) {
        var menus = ko.observableArray([]);
        var activate = function () {
            var homeMenu = new menuItem("#", "Home");
            var subMenu = new menuItem("#sessions", "Session", [
                new menuItem("#sessions", "Session1"),
                new menuItem("#sessions", "Session2"),
                new menuItem("#sessions", "Session3", [
                    new menuItem("#sessions", "Session1"),
                    new menuItem("#sessions", "Session2"),
                    new menuItem("#sessions", "Session3"),
                ]),
            ], ' <b class=caret></b>');
            menus.push(homeMenu);
            menus.push(subMenu);
            return Q.resolve();
        };

        var deactivate = function () {
            menus([]);
        };

        var viewAttached = function (view) {
        };

        var bindEventToList = function (rootSelector, selector, callback, eventName) {
            var eName = eventName || 'click';
            $(rootSelector).on(eName, selector, function () {
                var session = ko.dataFor(this);
                callback(session);
                return false;
            });
        };

        var vm = {
            activate: activate,
            deactivate: deactivate,
            attached: viewAttached,

            menus: menus
        };
        return vm;
    });