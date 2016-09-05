import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './editbar.html';


var compteur = 0;
Template.editbar.events({
    'keypress input': function(e) {
        var charCode = (typeof e.which == "number") ? e.which : e.keyCode;

        if (charCode == 13) {
            e.stopPropagation();
            insert();
            return false;
        }
        else if (charCode == 58) {
            emojisFadeIn();
        }
        else {
            $('.emojis').fadeOut();
        }
    },
    'click .btn-message': function(e) {
        insert();
    },
    'click .emoji': function(e) {
        var inputVal = $('.input-message').val();
        inputVal += e.target.src.split('/')[5].split('.')[0] + ': ';
        $('.input-message').val(inputVal);
        $('.emojis').fadeOut();
        $('.input-message').focus();
    },
    'click .smileys': function(e) {
        if ($('.emojis').is(':visible')) {
            var inputVal = $('.input-message').val();
            if (inputVal.charAt(inputVal.length - 1) === ":")
                $('.input-message').val(inputVal.substring(0, inputVal.length - 1));
            $('.emojis').fadeOut();
        }
        else {
            emojisFadeIn();
            var inputVal = $('.input-message').val();
            $('.input-message').val(inputVal + ":");
            $('.input-message').focus();
        }
    }
});

function insert() {
    var inputVal = $('.input-message').val();
    if(!!inputVal) {
        Messages.insert({
            content: $('.input-message').val(),
            authorUsername: Meteor.user().username,
            authorAvatar: Meteor.user().profile.avatarFileName,
            createdAt: new Date(),
            channel: Session.get('channel')
        });
        // clear input
        $('.input-message').val("");
        // put the div down
        $('.chat-zone').scrollTop($('.chat-zone')[0].scrollHeight);
    }
}

function emojisFadeIn() {
    $('.emojis').fadeIn();
    $('.chat-zone').scrollTop($('.chat-zone')[0].scrollHeight);
}
