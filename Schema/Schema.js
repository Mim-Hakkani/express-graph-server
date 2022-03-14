const graphql =require('graphql');
const axios = require('axios')
const {
    GraphQLObjectType,
    GraphQLSchema
}=graphql



const UserType =new GraphQLObjectType({
    name:'User',
    fields:{
        id:{type:graphql.GraphQLString},
        title:{type:graphql.GraphQLString},
        name:{type:graphql.GraphQLString},
        age:{type:graphql.GraphQLInt},
    }
});

const RootQuery =new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        user:{
            type:UserType,
            args:{id:{type:graphql.GraphQLString}},
            resolve(parentValue,args){
              
             return axios.get(`http://localhost:3000/users/${args.id}`)
             .then(res=>res.data);


                
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query:RootQuery
});

