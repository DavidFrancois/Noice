import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './register.html';

Template.register.helpers({
    error: function() {
        return Session.get('error').reason;
    }
});

Template.register.events({
    'submit.form': function(e) {
        e.preventDefault();

        var username = $('[name=username]').val();
        var password = $('[name=password]').val();
        var passwordConfirm = $('[name=passwordConfirm]').val();
        var email = $('[name=email]').val();

        if (password !== passwordConfirm)
            Session.set('error', {reason: 'Passwords are differents'});
        else {
            Meteor.call('ownCreateUser', {username: username, password: password, email: email}, function(err, data) {
                if (err) {
                    Session.set('error', err);
                }
                else {
                    delete Session.keys['error'];
                    Router.go('/');
                }
            });

        }
    }
});
