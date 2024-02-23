import express from 'express'
import { ApolloServer } from '@apollo/server'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { expressMiddleware } from '@apollo/server/express4'

import http from 'http'
import cors from 'cors'
import bodyParser from 'body-parser'

import { resolvers, typeDefs } from './src/peopleCarsScheme'

const startApolloServer = async (resolvers, typeDefs) => {
  const app = express()

  const httpServer = http.createServer(app)

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
  })

  await server.start()

  app.use(
    '/graphql',
    cors(),
    bodyParser.json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.headers.token })
    })
  )

  // Modified server startup
  await new Promise(resolve => httpServer.listen({ port: 8080 }, resolve))

  console.log(`Server started at http://localhost:8080/graphql`)
}

startApolloServer(resolvers, typeDefs)
