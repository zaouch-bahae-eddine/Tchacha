const { QueryBuilder } = require('../db/Builder/Query');
const MessageFormat = require('../db/DataFormat/Message');
const UserChannelFormat = require('../db/DataFormat/UserChannel');
const UserFormat = require('../db/DataFormat/User');
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
        return await QueryBuilder.deleteById(myMessage.id, MessageFormat);

    } catch (e) {
        console.log(e);
        return null;
    }
}
const getMessage = async (user, channel) => {
    try{
        const isMemeber = await QueryBuilder.findBy({user: user.id, channel: channel}, UserChannelFormat);
        if(isMemeber === null){
            return null;
        }
        //const messages = await QueryBuilder.findBy({channel: channel}, MessageFormat);
        const messages = await QueryBuilder.getMessage({channel: channel},{message: MessageFormat, user: UserFormat},MessageFormat);
        console.log(messages);
        if(messages != null && messages.length === undefined){
            return [messages];
        }
        return messages;
    }catch(e){
        console.log(e);
        return null;
    }
}

module.exports.MessageService = {
    addMessage,
    setMessage,
    rmMessage,
    getMessage
}