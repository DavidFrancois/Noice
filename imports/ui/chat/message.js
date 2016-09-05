import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './message.html';

Template.registerHelper('formatDate', function(time) {
    if ((moment().unix() - moment(time).unix()) < 3600) {
        return moment(time).fromNow();
    } else {
        return moment(time).format("HH:mm DD/MM/YYYY");
    }
});

Template.registerHelper('formatMessage', function(msg) {
    return msg.replace(/<(.+)>(.+)<\/(.+)>/g, '$2').replace(/:([a-z_+\-\d]*):/g, '<img src="img/emoji/$1.png" class="emoji" onerror="this.style.display=\'none\'">');
});

Template.message.events({
    'click #viewProfile': function(e) {
        Modal.show('view_profile', {
            username: this.username,
            avatar: this.avatar
        });
    }
});
