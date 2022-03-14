const graphql =require('graphql');
const axios = require('axios')
const {
    GraphQLObjectType,
    GraphQLSchema
}=graphql


//company schema 

const CompanyType =new GraphQLObjectType({
    name:'Company',
    fields: ()=>({
        id:{type:graphql.GraphQLString},
        fname:{type:graphql.GraphQLString},
        desc:{type:graphql.GraphQLString},
        users:{
            type:new graphql.GraphQLList(UserType),
            resolve(parentValue,args){    
             return axios.get(`http://localhost:3000/companies/${parentValue.id}/users`)
             .then(res=>res.data);
                
            }
        }
    })
});

//user schema 
const UserType =new GraphQLObjectType({
    name:'User',
    fields:{
        id:{type:graphql.GraphQLString},
        title:{type:graphql.GraphQLString},
        name:{type:graphql.GraphQLString},
        age:{type:graphql.GraphQLInt},
        company:{
            type:CompanyType,
            resolve(parentValue,args){    
             return axios.get(`http://localhost:3000/companies/${parentValue.companyId}`)
             .then(res=>res.data);
                
            }
        }
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
        },

        //add a another root company schema for call a single value 

        company:{
            type:CompanyType,
            args:{id:{type:graphql.GraphQLString}},
            resolve(parentValue,args){
                return axios.get(`http://localhost:3000/companies/${args.id}`)
                .then(res=>res.data)
            }
        }
    }
});


const mutation = new GraphQLObjectType({
    name:'Mutation',
    fields:{
        addUser:{
            type:UserType,
            args:{
                name: {type:graphql.GraphQLString},
                age:{type:graphql.GraphQLInt},
                companyId:{type:graphql.GraphQLString}
            },
            resolve(){

            }
        }
    }
})


module.exports = new GraphQLSchema({
    query:RootQuery
});

