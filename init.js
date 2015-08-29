require.config({
    paths: {
        underscore: '/bower_components/underscore/underscore-min',
        backbone: 'bower_components/backbone/backbone-min',
        jquery: 'bower_components/jquery/dist/jquery.min',
        text: 'bower_components/requirejs-text/text',
        handlebars: 'bower_components/handlebars/handlebars.amd.min',
        cryptico: 'bower_components/cryptico/cryptico',
        SHA256 : 'bower_components/cryptico/hash',
        store: 'bower_components/store.js/store.min'
    },
    shim: {
        cryptico: {
            exports: 'cryptico',
        },
        SHA256: {
        	exports: 'SHA256',
        }
    }

});



require(['app']);