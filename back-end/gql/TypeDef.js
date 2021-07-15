const { gql } = require("apollo-server");

const TypeDef = gql`
type Query{
    signIn(email: String, password: String):String
}
    type Mutation {
        register(user: UserInput!) : Token
        login(email: String, password: String): Token
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
`;
module.exports = TypeDef;