const { ApolloServer, gql } = require("apollo-server");
const TypeDef = require('./gql/TypeDef');
const Resolver = require('./gql/Resolver');
const secureRandom = require("secure-random");
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();
const JWT = require('njwt');
const {QueryBuilder} = require('./db/Builder/Query');
const UserForma = require('./db/DataFormat/User')
const c = {
    and: {
        or: {email: "a@a", password: "aze"},
        name: "maki",
        // and: {name: "bahae", id: 15}
    }
};
const q = QueryBuilder.conditionMaker(c, UserForma);
console.log(q);

const server = new ApolloServer({
    typeDefs: TypeDef, resolvers: Resolver, context: ({ req }) => {
        token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
        //console.log(token);
        if (token == null) {
            return { jwt: null };
        }
        try {
            verifiedJwt = JWT.verify(token, process.env.SECRET_KEY);
            return {jwt: verifiedJwt.body};
        } catch (e) {
            //Exp handl
            console.log({jwt: e.parsedBody});
        }
    }
});
if (process.env.SECRET_KEY === undefined) {
    fs.writeFile('./.env', 'SECRET_KEY=' + secureRandom(256, { type: 'Buffer' }), { flag: 'a' }, err => { console.log(err) });
}
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});