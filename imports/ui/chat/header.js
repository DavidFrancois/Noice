import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './header.html';

Template.header.helpers({
    current: function () {
        return Session.get('channel');
    }
});
