const { gql } = require("apollo-server");

const TypeDef = gql`
    type Query{
        getChannels: [Channel]
        getMyChannels: [Channel]
    }

    type Mutation {
        register(user: UserInput!) : TokenOrErrer
        login(email: String!, password: String!): TokenOrErrer

        createChannel(name: String!): Channel
        setChannelName(id: ID!, name: String!): Channel
        deleteChannel(id: ID!): Channel
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
        owner: User
        members: [User]
    }

    type Message{
        id: ID
        text: String
        owner: User
        channel: Channel
    }

    type Token {
        jwt: String
        msg: String
        status: Int
    }

    union TokenOrErrer = Token | Error
`;
module.exports = TypeDef;