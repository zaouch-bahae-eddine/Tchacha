import { gql } from "@apollo/client";

export const GET_MESSAGE = gql`
query Query($getMessageChannel: ID!) {
    messages: getMessage(channel: $getMessageChannel) {
        message {
            user
            id
            channel
            text
        }
        user {
            id
            name
            email
        }
        __typename
    }
}
`;

export const ADD_MESSAGE = gql`
    mutation AddMessageMutation($addMessageChannel: ID!, $addMessageText: String!) {
        addMessage(channel: $addMessageChannel, text: $addMessageText) {
            id
            channel
            user
            text
            __typename
        }
    }
`;

export const SET_MESSAGE = gql`
    mutation SetMessageMutation($setMessageMsgId: ID!, $setMessageText: String!) {
        setMessage(msgId: $setMessageMsgId, text: $setMessageText) {
            id
            channel
            text
            user
            __typename
        }
    }
`;

export const DELETE_MESSAGE = gql`
    mutation RmMessageMutation($rmMessageMsgId: ID!) {
        rmMessage(msgId: $rmMessageMsgId) {
            id
            channel
            text
            user
            __typename
        }
    }
`;