const express = require('express');
const expressGraphQL = require('express-graphql').graphqlHTTP;
const schema =require('./Schema/Schema')

const app = express();

app.use('/graphql', expressGraphQL({
    schema,
    graphiql:true
}));

app.get('/', (req, res) => {
  res.send('Hello World! mim hakkani is herer')
})

app.listen(4000, () => {
    console.log('Listning');
});