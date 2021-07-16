const { gql } = require("apollo-server");

const TypeDef = gql`
    type Query{
        getMembers(channel: ID!): [User]
    }

    type Mutation {
        register(user: UserInput!) : TokenOrErrer
        login(email: String!, password: String!): TokenOrErrer

        createChannel(name: String!): Channel
        setChannelName(id: ID!, name: String!): Channel
        deleteChannel(id: ID!): Channel

        addMemberToChannel(email: String!, channel: ID!): [User]
        rmMemberFromChannel(email: String!, channel: ID!): [User]
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