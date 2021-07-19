import { gql } from "@apollo/client";

export const GET_CHANNEL = gql`
    query Query {
        channels: getChannels {
            id
            name
        }
    }
`;

export const ADD_CHANNEL = gql`
    mutation CreateChannelMutation($createChannelName: String!) {
        createChannel(name: $createChannelName) {
            id
            name
        }
    }
`;

export const SET_CHANNEL = gql`
    mutation SetChannelNameMutation($setChannelNameId: ID!, $setChannelNameName: String!) {
        setChannelName(id: $setChannelNameId, name: $setChannelNameName) {
            id
            name
        }
    }
`;

export const DELETE_CHANNEL = gql`
    mutation DeleteChannelMutation($deleteChannelId: ID!) {
        deleteChannel(id: $deleteChannelId) {
            id
            name
        }
    }
`;

export const MEMBERS_CHANNEL = gql`
    query Query($getMembersChannel: ID!) {
        members: getMembers(channel: $getMembersChannel) {
            id
            email
            name
            __typename
        }
    }
`;

export const ADD_MEMBER = gql`
    mutation AddMemberToChannelMutation($addMemberToChannelEmail: String!, $addMemberToChannelChannel: ID!) {
        addMemberToChannel(email: $addMemberToChannelEmail, channel: $addMemberToChannelChannel) {
            id
            email
            name
            __typename
        }
    }
`;
export const DELETE_MEMBER = gql`
    mutation RmMemberFromChannelMutation($rmMemberFromChannelEmail: String!, $rmMemberFromChannelChannel: ID!) {
        rmMemberFromChannel(email: $rmMemberFromChannelEmail, channel: $rmMemberFromChannelChannel) {
            id
            name
            email
            __typename
        }
    }
`;
export const GET_CHANNEL_BY_ID = gql`
    query Query($getChaneByIdChannelId: ID!) {
        channel: getChaneById(channelId: $getChaneByIdChannelId) {
            id
            name
            __typename
        }
    }
`;