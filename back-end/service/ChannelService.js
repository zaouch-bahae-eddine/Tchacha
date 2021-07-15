const channelFormat = require('../db/DataFormat/Channel');
const { QueryBuilder }  = require('../db/Builder/Query');

const createChannel = async (user, data) => {
    data.owner = user.id;
    console.log(data);
    const newChannel = await QueryBuilder.add(data, channelFormat);
    newChannel.owner = {id: user.id, name: user.name, email: user.email};
    return newChannel;
}

const setChannelName = async (user, data) => {
    console.log("data", data, "user", user);
    const oldChannel = await QueryBuilder.findBy({id: data.id, owner: user.id}, channelFormat);
    if(oldChannel == null){
        return null;
    }
    data.owner = user.id;
    const newChannel = await QueryBuilder.setById(data, channelFormat);
    newChannel.owner = {id: user.id, name: user.name, email: user.email};
    return newChannel;
}

const deleteChannel = async (user, id) => {
    const oldChannel = await QueryBuilder.findBy({id: id, owner: user.id}, channelFormat);
    if(oldChannel == null){
        return null;
    }
    const newChannel = await QueryBuilder.deleteById(id, channelFormat);
    newChannel.owner = {id: user.id, name: user.name, email: user.email};
    return newChannel;
}

module.exports.ChannelService = {
    createChannel,
    setChannelName,
    deleteChannel
};