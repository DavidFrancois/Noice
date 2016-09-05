import '../imports/ui/chat/interface.js';
import '../imports/ui/users/login.js';
import '../imports/ui/users/register.js';

import moment from 'croppie';

Session.set('channel', 'General');

Meteor.subscribe('userStatus');

Router.configure({
    layoutTemplate: 'app'
});

Router.onBeforeAction(function() {
    if (!Meteor.userId()) {
        this.render('login');
    } else {
        this.next();
    }
}, {except: ['login', 'register']});

Router.route('/', function () {
    this.render('interface');
});

Router.route('/login', function() {
    this.render('login');
});

Router.route('/register', function() {
    this.render('register');
});
