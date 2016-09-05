Subscribes = new Mongo.Collection("subscribes", {
    schema: {
        right: {
            type: String
        },
        channelId: {
            type: Meteor.ObjectID
        },
        userId: {
            type: Meteor.ObjectID
        },
    }
});
