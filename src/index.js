import express from 'express'
import { graphqlExpress,graphiqlExpress } from 'apollo-server-express'
import { makeExecutableSchema } from 'graphql-tools'
import { createServer } from 'http'
import bodyParser from 'body-parser'

import './config/db'
import constants from './config/constants'
import typeDefs from './graphql/schema'
import resolvers  from './graphql/resolvers'
import mocks from './mocks'

const app = express()

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})

app.use(bodyParser.json())

app.use('/graphiql', graphiqlExpress({
    endpointURL: constants.GRAPHQL_PATH
}))

app.use(constants.GRAPHQL_PATH, graphqlExpress({
    schema
}))

const graphQlServer = createServer(app)

mocks().then(() => {
    graphQlServer.listen(constants.PORT, err => {
        err ? console.error(err) : console.log(`App listen on port: ${constants.PORT}`)
    })
})