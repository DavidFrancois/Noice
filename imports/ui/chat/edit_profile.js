import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './edit_profile.html';

Template.edit_profile.helpers({
    error: function() {
        return Session.get('error').reason;
    },
    success: function() {
        return Session.get('success').message;
    },
    avatar: function() {
        return Meteor.user().profile.avatarFileName;
    },
    uploadCallbacks: function() {
        return {
            formData: function() { return { id: "232323"}},
            finished: function(index, fileInfo, context) {
                var username = Meteor.user().username;
                Meteor.users.update(Meteor.userId(), {
                    $set: {
                        'profile.avatarFileName': fileInfo.name,
                    }
                });
                Meteor.call('updateAvatar', {username: Meteor.user().username, fileName: fileInfo.name});
            },
        }
    }

});

Template.edit_profile.events({
    'submit': function(e) {
        delete Session.keys['error'];
        delete Session.keys['success'];
        e.preventDefault();
        var oldPassword = $('[name=old-password]').val();
        var newPassword = $('[name=new-password]').val();
        var verification = $('[name=verification]').val();
        if (newPassword !== verification) {
            Session.set('error', {reason: 'Passwords are differents'});
            return;
        }
        Accounts.changePassword(oldPassword, newPassword,
            function(error) {
                if(error) {
                    Session.set('error', {reason: error.reason});
                    return;
                }
                else {
                    Session.set('success', {message: "Password has been changed"});
                }
            });
        }
    });
