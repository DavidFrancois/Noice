Messages = new Mongo.Collection("messages", {
    schema: {
        content: {
            type: String
        },
        authorUsername: {
            type: String
        },
        authorAvatar: {
            type: String
        },
        createdAt: {
            type: Date
        },
        channel: {
            type: String
        }
    }
});
