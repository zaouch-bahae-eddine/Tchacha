const { QueryBuilder } = require('../db/Builder/Query');
const MessageFormat = require('../db/DataFormat/Message');
const UserChannelFormat = require('../db/DataFormat/UserChannel');

const addMessage = async (user, channel, message) => {
    try {
        const existeUserInChannel = await QueryBuilder.findBy({ user: user.id, channel: channel }, UserChannelFormat);
        if (existeUserInChannel === null) {
            return null;
        }
        const messageAdded = await QueryBuilder.add({ user: user.id, channel: channel, text: message }, MessageFormat);
        return messageAdded;
    } catch (e) {
        console.log(e);
        return null;
    }
}

const setMessage = async (user, msgId, message) => {
    try {
        const myMessage = await QueryBuilder.findBy({ user: user.id, id: msgId }, MessageFormat);
        if (myMessage === null) {
            return null;
        }
        myMessage.text = message;
        const messageModified = await QueryBuilder.setById(myMessage, MessageFormat);
        console.log(messageModified);
        return messageModified;
    } catch (e) {
        console.log(e);
        return null;
    }
}

const rmMessage = async (user, msgId, message) => {
    try {
        const myMessage = await QueryBuilder.findBy({ user: user.id, id: msgId }, MessageFormat);
        if (myMessage === null) {
            return null;
        }
        const messagedeleted = await QueryBuilder.deleteById(myMessage.id, MessageFormat);
        console.log(messagedeleted);
        return messagedeleted;
    } catch (e) {
        console.log(e);
        return null;
    }
}
module.exports.MessageService = {
    addMessage,
    setMessage,
    rmMessage
}