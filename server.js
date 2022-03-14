// import express from 'express';
// const expressGraphQL = require('express-graphql').graphqlHTTP
// const app = express()
// const port = 4000


// app.use('/graphql',expressGraphQL({
//     graphiql:true
// }));


// app.get('/', (req, res) => {
//   res.send('Hello World! the hakkani ')
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })


const express = require('express');
const expressGraphQL = require('express-graphql').graphqlHTTP;


const app = express();

app.use('/graphql', expressGraphQL({
    graphiql:true
}));

app.listen(4000, () => {
    console.log('Listning');
})