import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './user.html';

Template.user.helpers({
    username: function () {
        return Meteor.user().username;
    },
    avatar: function () {
        return Meteor.user().profile.avatarFileName;
    }
});

Template.user.events({
    'click .logout': function(e) {
        Meteor.logout();
        Router.go('/');
    },
    'click .profile': function(e) {
        delete Session.keys['error'];
        delete Session.keys['success'];
        Modal.show('edit_profile', {
            username: Meteor.user().username});
        }
    })
