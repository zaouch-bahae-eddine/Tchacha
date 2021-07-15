const { ApolloError } = require("apollo-server");
const { AuthService } =require('../service/AuthService');
const { JWTService } = require('../service/JWTService');
const Resolver = {
    Mutation: {
        register: async(obj, args, context, info) => {
            console.log("context.jwt");
            console.log(context.jwt);
            if (context.jwt !== null){
                throw new ApolloError(
                    "You can't create an a count while you are connected",
                    "FORBIDDEN"
                );
            }
            userRegistred = await AuthService.registerUser(args.user);
            return {jwt: JWTService.makeJWT(), msg:"welcome " + userRegistred.name, status: 201};
        },
        login: async(obj, args, context, info) => {
            if (context.jwt !== null){
                throw new ApolloError(
                    "You are aleready login what you want han!",
                    "FORBIDDEN"
                );
            }
            return {jwt:"", msg:"", status:"200"};
        }
    },
};

module.exports = Resolver;