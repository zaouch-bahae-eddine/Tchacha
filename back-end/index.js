const { ApolloServer, gql } = require("apollo-server");
const TypeDef = require('./gql/TypeDef');
const Resolver = require('./gql/Resolver');
const secureRandom = require("secure-random");
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();
const JWT = require('njwt');
const { QueryBuilder } = require('./db/Builder/Query');
const UserForma = require('./db/DataFormat/User')

const server = new ApolloServer({
    typeDefs: TypeDef, resolvers: Resolver, context: ({ req }) => {
        const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
        if (token == null) {
            return { user: null };
        }
        try {
            const verifiedJwt = JWT.verify(token, process.env.SECRET_KEY);
            return { user: verifiedJwt.body};
        } catch (e) {
            //Exp handl
            //console.log(e);
            console.log(e);
            return {user: null}
        }
    }
});
if (process.env.SECRET_KEY === undefined) {
    fs.writeFile(
        './.env', 'SECRET_KEY=' + secureRandom(256, { type: 'Buffer' }),
        { flag: 'a' },
        err => { console.log(err) }
    );
}
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});