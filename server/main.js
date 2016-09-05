import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {

    // Upload file for profile avatar
    UploadServer.init({
        tmpDir: process.env.PWD + '/public/img/avatars/tmp',
        uploadDir: process.env.PWD + '/public/img/avatars',
        checkCreateDirectories: true, //create the directories for you
        //change file name :
        //getFileName: function(fileInfo, formData) { return Meteor.userId(); }
    });

    Meteor.publish("userStatus", function() {
        return Meteor.users.find({ "status.online": true });
    });

    UserStatus.events.on("connectionLogin", function(fields) {
        var subscribes = Subscribes.find({userId: fields.userId});

        subscribes.forEach(subscribe => {
            Channels.update({_id: subscribe.channelId},
                            {$inc: {
                                'nbLogged': 1
                            }});
        });
    });

    UserStatus.events.on("connectionLogout", function(fields) {
        var subscribes = Subscribes.find({userId: fields.userId});

        subscribes.forEach(subscribe => {
            Channels.update({_id: subscribe.channelId},
                            {$inc: {
                                'nbLogged': -1
                            }});
        });
    });

    //Clean all Collections
    // Meteor.users.remove({});
    // Messages.remove({});
    // Subscribes.remove({});
    Channels.remove({});


    if (Channels.find().count() === 0) {
        Channels.insert({
            name: "General",
            isPersonnal: false,
            nbLogged: 0,
            subscribers: []
        });
        Channels.insert({
            name: "Random",
            isPersonnal: false,
            nbLogged: 0,
            subscribers: []
        });
        Channels.insert({
            name: "Noice",
            isPersonnal: false,
            nbLogged: 0,
            subscribers: []
        });
    }

    Meteor.methods({
        'updateAvatar': function(data) {
            Messages.update({
                authorUsername: data.username
            }, {
                $set: {
                    authorAvatar: data.fileName
                }
            }, {
                multi: true
            });
        },

        'addFriend': function(userId, userName) {
            Meteor.users.update({_id: userId},{
                $push: {
                    'profile.friends': {username: userName}
                }
            });
        },

        'getChannelsFor': function(id) {
            let subscribes = Subscribes.find({userId: id});
            let channels = [];
            subscribes.forEach(sub => {
                const channel = Channels.findOne({_id: sub.channelId});
                channels.push(channel);
            })
            return channels;
        },

        'ownCreateUser': function(data) {
            let username = data.username;
            let password = data.password;
            let email = data.email;
            let profile = {
                avatarFileName: "default.png",
                friends: []
            };

            var id = Accounts.createUser({
                username: username,
                email: email,
                password: password,
                profile: profile
            });

            Channels.find().forEach(channel => {
                Subscribes.insert({
                    right: 'user',
                    channelId: channel._id,
                    userId: id
                });

                Channels.update({_id: channel._id, isPersonnal: false} ,{
                    $push: {
                        subscribers: {username: username}
                    }
                });
            });
        }

    })

});
