Channels = new Mongo.Collection("channels", {
    schema: {
        name: {
            type: String
        },
        maxUsers: {
            type: Number,
            defaultValue: 10
        },
        isPersonnal: {
            type: Boolean
        },
        nbLogged: {
            type: Number
        },
        subscribers: {
            type: Array
        }
    }
});
