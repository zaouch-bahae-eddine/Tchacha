const { QueryBuilder }  = require('../db/Builder/Query');
const UserFormat = require('../db/DataFormat/User');
const ChannelFormat = require('../db/DataFormat/Channel');
const UserChannelFormat = require('../db/DataFormat/UserChannel');

const createChannel = async (user, name) => {
    const newChannel = await QueryBuilder.add({name: name}, ChannelFormat);
    await QueryBuilder.add({user: user.id, channel: newChannel.id, owner: 1}, UserChannelFormat);
    return newChannel;
}

const setChannelName = async (user, data) => {
    const oldUserChannel = await QueryBuilder.findBy({user: user.id, channel: data.id, owner: 1}, UserChannelFormat);
    if(oldUserChannel == null){
        return null;
    }
    const newChannel = await QueryBuilder.setById(data, ChannelFormat);
    return newChannel;
}

const deleteChannel = async (user, id) => {
    const oldChannel = await QueryBuilder.findById(id, ChannelFormat);
    if(oldChannel === null){
        return null;
    }
    const oldUserChannel = await QueryBuilder.findBy({user: user.id, channel: id, owner: 1}, UserChannelFormat);
    if(oldUserChannel == null){
        return null;
    }
    await QueryBuilder.deleteById(oldUserChannel.id, UserChannelFormat);
    QueryBuilder.deleteById(oldChannel.id, ChannelFormat);
    return oldChannel;
}

const addMemberToChannel = async (user, memberEmail, channelId) => {
    const oldUserChannel = await QueryBuilder.findBy({user: user.id, channel: channelId, owner: 1}, UserChannelFormat);
    if(oldUserChannel == null){
        return null;
    }
    const member = await QueryBuilder.findBy({email: memberEmail}, UserFormat);
    if(member === null){
        return null;
    }
    const newMumber = await QueryBuilder.add({user: member.id, channel: channelId}, UserChannelFormat);
}

const getAllMember = async (user, channelId) => {
    const allowed = QueryBuilder.findBy({user: user.id, channel: channelId}, UserChannelFormat);
    if(allowed === null){
        return null;
    }
    const members = QueryBuilder.findBy({channel: channelId}, UserChannelFormat);
    
}
module.exports.ChannelService = {
    createChannel,
    setChannelName,
    deleteChannel
};