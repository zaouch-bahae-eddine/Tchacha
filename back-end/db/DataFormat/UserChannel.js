const UserChannel = {
    table: "user_channel",
    fields: {
        id: 'id',
        user: 'user_id',
        channel: 'channel_id',
        owner: 'owner'
    }
};
module.exports = UserChannel;