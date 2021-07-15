const { ApolloError } = require("apollo-server");
const { AuthService } =require('../service/AuthService');
const { ChannelService } = require("../service/ChannelService");
const { JWTService } = require('../service/JWTService');
const Resolver = {
    TokenOrErrer: {
        __resolveType: obj => {
            if(obj.jwt != null) return "Token";
            if(obj.status >= 400) return "Error";
        }
    },
    Mutation: {
        register: async(obj, args, context, info) => {
            if (context.user !== null){
                console.log(context.user);
                const error = {
                    msg: "You can't create an acount while you are connected",
                    status: 409
                };
                return error;
            }
            const userRegistred = await AuthService.registerUser(args.user);
            delete userRegistred.password;
            return {jwt: JWTService.makeJWT(userRegistred), msg:"welcome " + userRegistred.name, status: 201};
        },

        login: async(obj, args, context, info) => {
            if (context.user !== null){
                const error =  {
                    msg: "Already Connceted",
                    status: 409
                };
                return error;
            }
            const logedUser = await AuthService.loginUser(args.email, args.password);
            console.log(logedUser);
            if(logedUser === null){
                return {
                    msg: "email or password is wrong",
                    status: 403
                };
            }
            delete logedUser.password;
            console.log(JWTService.makeJWT(logedUser));
            return {
                jwt:JWTService.makeJWT(logedUser),
                msg:"Connected",
                status: 200
            };
        },

        createChannel: async (obj, args, context, info) => {
            if(context.user === null){
                throw new Error("You must be connected !");
            }
            return await ChannelService.createChannel(context.user, args.name);
        },

        setChannelName: async (obj, args, context, info) => {
            if(context.user == null){
                throw new Error("You must be connected !");
            }
            let newChannel = {
                id: args.id,
                name: args.name
            }
            newChannel = await ChannelService.setChannelName(context.user, newChannel);
            if(newChannel == null){
                throw new Error("You cant change others channel !"); 
            }
            return newChannel;
        },

        deleteChannel: async (obj, args, context, info) => {
            if(context.user == null){
                throw new Error("You must be connected !");
            }
            const deletedChannel = await ChannelService.deleteChannel(context.user, args.id);
            if(deletedChannel == null){
                throw new Error("You cant delete others channel !"); 
            }
            return deletedChannel;
        },
/*         getMyChannels: async (obj, args, context, info) => {
            if(context.user == null){
                throw new Error("You must be connected !");
            }
            const deletedChannel = await ChannelService.deleteChannel(context.user, args.id);
        } */
    },
};

module.exports = Resolver;