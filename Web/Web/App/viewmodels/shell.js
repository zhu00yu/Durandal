define(['durandal/system',
        'services/logger',
        'plugins/router',
        'durandal/app',
        'config',
        'services/datacontext'],
    function (system, logger, router, app, config, datacontext) {

        var adminRoutes = ko.computed(function() {
            return config.routes.filter(function (r) {
                return r.settings.admin;
            });
        });

        var shell = {
            activate: activate,
            addSession: addSession,
            adminRoutes: adminRoutes,
            menubar: ko.observable('viewmodels/menubar_admin'),
            sidebar: ko.observable('viewmodels/sidebar_admin'),
            router: router
        };
        return shell;

        function activate() {
            app.title = config.appTitle;
            return datacontext.primeData()
                .then(boot)
                .fail(failedInitialization);
        }
        
        function boot() {
            logger.log('CodeCamper JumpStart Loaded!', null, system.getModuleId(shell), true);

            router.on('router:route:not-found', function (fragment) {
                logger.logError('No Route Found', fragment, system.getModuleId(shell), true);
            });

            router.makeRelative({ moduleId: 'viewmodels' }).map(config.routes)
                .buildNavigationModel();
            return router.activate();
        }

        function addSession(item) {
            router.navigate(item.hash);
        }


        function failedInitialization(error) {
            var msg = 'App initialization failed: ' + error.message;
            logger.logError(msg, error, system.getModuleId(shell), true);
        }
    }
);