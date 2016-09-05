import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './add_friend.html';

Template.add_friend.helpers({
    error: function() {
        return Session.get('error');
    }
});

Template.add_friend.events({
    'click .friend': function(e) {
        e.preventDefault();
        var newFriend = e.target.innerHTML;
        var userFriend = Meteor.users.findOne({
            username: newFriend
        });

        if (userFriend.username === Meteor.user().username) {
            Session.set('error', "You're not a friend !");
        }
        else if (contains(Meteor.user().profile.friends, userFriend.username)) {
            Session.set('error', "You're already friends !");
        }
        else {
            Meteor.call('addFriend', Meteor.userId(), userFriend.username);
            Meteor.call('addFriend', userFriend._id, Meteor.user().username);
        }
    },
    'keyup input': function(e) {
        var search = $('[name=friendName]').val();

        if (search === "") {
            $('.results').empty();
            return false;
        }

        var regEx = new RegExp("(" + search + ").*", 'g');
        var results = Meteor.users.find({"username": regEx});

        $('.results').empty();
        results.forEach(function(u) {
            $('.results').append("<div><button type=\"button\" class=\"friend col-md-8 col-md-offset-2 btn btn-primary\">" + u.username + "</button></div>");
        });
        return true;
    }
});

function contains(friendsArray, username) {
    for (var i = 0; i < friendsArray.length; ++i) {
        if (friendsArray[i].username === username)
            return true;
    }
    return false;
}
