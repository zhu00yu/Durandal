define(function () {
    toastr.options.timeOut = 4000;
    toastr.options.positionClass = 'toast-bottom-right';

    var imageSettings = {
        imageBasePath: '../content/images/photos/',
        unknownPersonImageSource: 'unknown_person.jpg'
    };

    var remoteServiceName = 'breeze/Breeze';

    var appTitle = 'CCJS';

    var routes = [
        { route: '', moduleId: 'sessions', title: 'Sessions', nav: false, settings: {} },
        { route: 'sessions', moduleId: 'sessions', title: 'Sessions', nav: 1, settings: {} },
        { route: 'speakers', moduleId: 'speakers', title: 'Speakers', nav: 2, settings: {} },
        { route: 'sessiondetail/:id', moduleId: 'sessiondetail', title: 'Edit Session', nav: false, settings: { admin: true } },
        { route: 'sessionadd', moduleId: 'sessionadd', title: 'Add Session', nav: false, settings: { admin: true } },
    ];

    var startModule = {
        root: 'sessions'
    };

    return {
        appTitle: appTitle,
        debugEnabled: ko.observable(true),
        imageSettings: imageSettings,
        remoteServiceName: remoteServiceName,
        routes: routes,
        startModule: startModule
    };
});