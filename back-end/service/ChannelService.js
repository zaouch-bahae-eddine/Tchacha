const { QueryBuilder } = require('../db/Builder/Query');
const UserFormat = require('../db/DataFormat/User');
const ChannelFormat = require('../db/DataFormat/Channel');
const UserChannelFormat = require('../db/DataFormat/UserChannel');

const getChaneById = async (user, channelId) => {
    const channel = await QueryBuilder.getChannels({ user: user.id, channel: channelId }, ChannelFormat, UserChannelFormat);
    return channel;
}

const getChannels = async (user) => {
    const channels = await QueryBuilder.getChannels({ user: user.id }, ChannelFormat, UserChannelFormat);
    if (channels != null && channels.length === undefined) {
        return [channels];
    }
    return channels;
}

const getChannelOwner = async (user, channelId) => {
    const allowed = await QueryBuilder.findBy({ user: user.id, channel: channelId }, UserChannelFormat);
    if (allowed === null) {
        return null;
    }
    const owner = await QueryBuilder.getMembers({ channel: channelId, owner: 1 }, UserFormat, UserChannelFormat);
    return owner;
}

const createChannel = async (user, name) => {
    const newChannel = await QueryBuilder.add({ name: name }, ChannelFormat);
    await QueryBuilder.add({ user: user.id, channel: newChannel.id, owner: 1 }, UserChannelFormat);
    return newChannel;
}

const setChannelName = async (user, data) => {
    const ownerUser = await QueryBuilder.findBy({ user: user.id, channel: data.id, owner: 1 }, UserChannelFormat);
    if (ownerUser == null) {
        return null;
    }
    const newChannel = await QueryBuilder.setById(data, ChannelFormat);
    return newChannel;
}

const deleteChannel = async (user, id) => {
    const existChannel = await QueryBuilder.findBy({ user: user.id, channel: id, owner: 1 }, UserChannelFormat);
    if (existChannel === null) {
        return null;
    }
    const deletedChannel = await QueryBuilder.deleteById(id, ChannelFormat);
    return deletedChannel;
}

const addMemberToChannel = async (user, memberEmail, channelId) => {
    const allowed = await QueryBuilder.findBy({ user: user.id, channel: channelId, owner: 1 }, UserChannelFormat);

    if (allowed == null) {
        return null;
    }
    const member = await QueryBuilder.findBy({ email: memberEmail }, UserFormat);
    if (member === null) {
        return null;
    }
    try {
        await QueryBuilder.add({ user: member.id, channel: channelId, owner: 0 }, UserChannelFormat);
        return await QueryBuilder.getMembers({ channel: channelId }, UserFormat, UserChannelFormat);
    } catch (e) {
        console.log(e);
        return await QueryBuilder.getMembers({ channel: channelId }, UserFormat, UserChannelFormat);
    }
}
const rmMemberFromChannel = async (user, memberEmail, channelId) => {
    const memberOfTheChannel = await QueryBuilder.findBy({ user: user.id, channel: channelId }, UserChannelFormat);
    if (memberOfTheChannel == null) {
        return null;
    }
    const memberToDelete = await QueryBuilder.findBy({ email: memberEmail }, UserFormat);
    if (memberToDelete == null) {
        return null;
    }
    const group = await QueryBuilder.findBy({ user: memberToDelete.id, channel: channelId }, UserChannelFormat);
    if (group == null) {
        return null;
    }
    if ((memberOfTheChannel.owner == 1) || (
        memberOfTheChannel.owner == 0 &&
        memberToDelete.id == user.id)) {
        try {
            await QueryBuilder.deleteById(group.id, UserChannelFormat);
            return memberToDelete;
        } catch (e) {
            console.log(e);
            return null;
        }
    } else {
        return null;
    }
}

const getMembers = async (user, channelId) => {
    const allowed = await QueryBuilder.findBy({ user: user.id, channel: channelId }, UserChannelFormat);
    if (allowed === null) {
        return null;
    }
    const members = await QueryBuilder.getMembers({ channel: channelId }, UserFormat, UserChannelFormat);
    if (members != null && members.length === undefined) {
        return [members];
    }
    return members;
}
module.exports.ChannelService = {
    getChannels,
    getChaneById,
    getChannelOwner,
    createChannel,
    setChannelName,
    deleteChannel,
    getMembers,
    addMemberToChannel,
    rmMemberFromChannel,
};