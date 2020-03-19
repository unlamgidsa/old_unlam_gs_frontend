define([
    './components/globalLoginIndicator.vue',
    './loginAction',
    'vue'
], function (
    GlobalLoginIndicator,
    LoginAction,
    Vue
) {
    return function plugin(appliesToObjects) {
        //appliesToObjects = appliesToObjects || [];

        return function install(openmct) {
            
            let component = new Vue ({
                    provide: {
                        openmct
                    },
                    components: {
                        GlobalLoginIndicator:GlobalLoginIndicator.default
                    },
                    template: '<GlobalLoginIndicator></GlobalLoginIndicator>'
                }),
                indicator = {
                    element: component.$mount().$el
                };

            openmct.indicators.add(indicator);

            openmct.contextMenu.registerAction(new LoginAction.default(openmct, appliesToObjects));
            
           console.log("Login action installed!")
        };
    };
});
