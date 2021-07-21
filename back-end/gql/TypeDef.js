const { gql } = require("apollo-server");

const TypeDef = gql`
    type Query{
        getChaneById(channelId: ID!) : Channel
        getChannels: [Channel]
        getMembers(channel: ID!): [User]
        getMessage(channel: ID!) : [MessageComplet]
    }

    type Mutation {
        register(user: UserInput!) : TokenOrErrer
        login(email: String!, password: String!): TokenOrErrer

        createChannel(name: String!): Channel
        setChannelName(id: ID!, name: String!): Channel
        deleteChannel(id: ID!): Channel

        addMemberToChannel(email: String!, channel: ID!): User
        rmMemberFromChannel(email: String!, channel: ID!): User

        addMessage(channel: ID!, text: String!): Message
        setMessage(msgId: ID!, text: String!): Message
        rmMessage(msgId: ID!): Message
    }

    type Error {
        msg: String
        status: Int
    }

    type User {
        id: ID
        name: String
        email: String
        password: String
    }
    
    input UserInput {
        id: ID
        name: String
        email: String
        password: String
    }

    type Channel{
        id: ID
        name: String
    }

    type Message{
        id: ID
        text: String
        user: Int,
        channel: Int
    }

    type MessageComplet{
        message: Message,
        user: User
    }

    type Token {
        jwt: String
        msg: String
        status: Int
    }

    union TokenOrErrer = Token | Error
`;
module.exports = TypeDef;