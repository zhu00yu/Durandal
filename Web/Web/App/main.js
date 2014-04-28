require.config({
    paths: {
        'text': '../Scripts/text',
        'durandal': '../Scripts/durandal',
        'plugins': '../Scripts/durandal/plugins',
        'transitions': '../Scripts/durandal/transitions',
    },
    
    shim: {
        '../Scripts/bootstrap.switch/bootstrap-switch.min.js': ['jquery'],
        '../Scripts/jquery.nanoscroller/jquery.nanoscroller.js': ['jquery'],
    }
});
define('jquery', function () { return jQuery; });
define('knockout', ko);

define(['durandal/app', 'durandal/viewLocator', 'durandal/system', 'plugins/router', 'services/logger'], boot);

function boot (app, viewLocator, system, router, logger) {

    system.debug(true);

    app.configurePlugins({
        router: true,
        dialog: true
    });
    
    app.start().then(function () {
        // route will use conventions for modules
        // assuming viewmodels/views folder structure
        //router.useConvention();

        // When finding a module, replace the viewmodel string 
        // with view to find it partner view.
        // [viewmodel]s/sessions --> [view]s/sessions.html
        // Otherwise you can pass paths for modules, views, partials
        // Defaults to viewmodels/views/views. 
        viewLocator.useConvention();

        //initApp();
        app.setRoot('viewmodels/shell', 'entrance');
        
        // override bad route behavior to write to 
        // console log and show error toast
        //router.handleInvalidRoute = function(route, params) {
        //    logger.logError('No route found', route, 'main', true);
        //};
    });

}

function initApp() {
    /* ---- Begin integration of Underscore template engine with Knockout. Could go in a separate file of course. ---- */
    ko.underscoreTemplateEngine = function () { };
    ko.underscoreTemplateEngine.prototype = ko.utils.extend(new ko.templateEngine(), {
        renderTemplateSource: function (templateSource, bindingContext, options) {
            // Precompile and cache the templates for efficiency
            var precompiled = templateSource['data']('precompiled');
            if (!precompiled) {
                precompiled = _.template("<% with($data) { %> " + templateSource.text() + " <% } %>");
                templateSource['data']('precompiled', precompiled);
            }
            // Run the template and parse its output into an array of DOM elements
            var renderedMarkup = precompiled(bindingContext).replace(/\s+/g, " ");
            return ko.utils.parseHtmlFragment(renderedMarkup);
        },
        createJavaScriptEvaluatorBlock: function (script) {
            return "<%= " + script + " %>";
        }
    });
    ko.setTemplateEngine(new ko.underscoreTemplateEngine());
    /* ---- End integration of Underscore template engine with Knockout ---- */
}