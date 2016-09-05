import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './login.html';

Template.login.helpers({
    error: function() {
        return Session.get('error').reason;
    }
});

Template.login.events({
    'submit form': function(e) {
        e.preventDefault();
        var username = $('[name=username]').val();
        var password = $('[name=password]').val();

        Meteor.loginWithPassword(username, password, function(error) {
            if (error) {
                Session.set('error', error);
            }
            else {
                delete Session.keys['error'];
                Router.go("/");
            }
        });
    }
});
