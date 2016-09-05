import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './interface.html';

import './header.js'
import './channel.js';
import './message.js';
import './editbar.js';
import './user.js';
import './friend.js';
import './logged.js';

import './view_profile.js';
import './edit_profile.js';
import './add_friend.js';


Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY'
})

Template.interface.helpers({
    channels: function() {
        Meteor.call('getChannelsFor', Meteor.userId(), function(error, data) {
            if (error)
                console.log(error)
            else {
                var channels = [];
                for(var channel of data){
                    if(!channel.isPersonnal){
                        channels.push(channel);
                    }
                }
                Session.set('channels', channels);
            }
        })
        return Session.get('channels');
    },
    messages: function() {
        return Messages.find({channel: Session.get('channel')}, {sort: {createdAt: 1}});
    },
    friends: function() {
        return Meteor.users.find({$or: Meteor.user().profile.friends});
    },
    allLogged: function() {
        return Meteor.users.find({$or: Channels.findOne({name: Session.get('channel')}, {fields: {subscribers:1}}).subscribers});
    }
});

Template.interface.events({
    'click #addFriend': function(e){
        delete Session.keys['error'];
        Modal.show('add_friend');
    },
    'click .friend-username': function(e){
        var friend = Meteor.users.find({username: this.username}).fetch()[0];
        console.log(friend);
        var user = Meteor.user();
        var channelName;
        if(user.username > friend.username)
            channelName = user.username + " - " + friend.username;
        else
            channelName = friend.username + " - " + user.username;


        if(Channels.find({name: channelName}).fetch().length === 0){
            Channels.insert({
                name: channelName,
                maxUsers:2,
                isPersonnal:true
            }, function(error, ID){
                if(error){
                    console.log("failed to insert in Channels");
                    console.log(error);
                }
                Subscribes.insert({
                    right: "user",
                    channelId:ID,
                    userId:Meteor.userId()
                });
                Subscribes.insert({
                    right: "user",
                    channelId:ID,
                    userId:friend._id
                });
            });
        }
        Session.set('channel', channelName);
    }
});
