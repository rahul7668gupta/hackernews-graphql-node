const { ApolloServer, PubSub } = require('apollo-server');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const pubsub = new PubSub();

const fs = require('fs');
const path = require('path');
const typeDefs = fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf-8');

const { feedResolver, createLinkResolver, updateLinkResolver, deleteLinkResolver } = require('./resolvers/index');
const { newLinkResolver } = require('./resolvers/subscription');

const resolvers = {
  Query: {
    info: () => `this is the api of a hacker news clone`,
    feed: feedResolver
  },
  Mutation: {
    createLink: createLinkResolver,
    updateLink: updateLinkResolver,
    deleteLink: deleteLinkResolver
  },
  Subscription: {
    newLink: newLinkResolver
  }
}

const server = new ApolloServer({
  typeDefs, resolvers, context: ({ req }) => {
    return {
      ...req,
      prisma,
      pubsub,
    }
  }
});

server.listen(4001).then(({ url }) =>
  console.log(`server listening on ${url}`)
);