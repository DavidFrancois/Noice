import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './channel.html';

Template.channel.helpers({
    active: function () {
        return Session.get('channel') === this.name;
    },
    nbLogged: function() {
        return Channels.findOne({name: this.name}).nbLogged;
    }
});

Template.channel.events({
    'click .channel .name': function (e) {
        Session.set('channel', this.name);
    }
});
