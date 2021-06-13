import PrismaX from "@prisma/client";
import { ApolloServer, PubSub } from "apollo-server";
import * as fs from "fs";
import path from "path";
import * as Link from "./resolvers/Link.js";
import * as Mutation from "./resolvers/Mutation.js";
import * as Subscription from "./resolvers/Subscription.js";
import * as Query from "./resolvers/Query.js";
import * as User from "./resolvers/User.js";
import * as Vote from "./resolvers/Vote.js";

import { getUserId } from "./utils.js";

const pubsub = new PubSub();

const { PrismaClient } = PrismaX;

const prisma = new PrismaClient();

const resolvers = {
  Query,
  Mutation,
  Subscription,
  User,
  Link,
  Vote,
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync(
    path.join(path.resolve(), "src/schema.graphql"),
    "utf-8"
  ),
  resolvers,
  context: ({ req }) => {
    return {
      ...req,
      prisma,
      pubsub,
      userId: req && req.headers.authorization ? getUserId(req) : null,
    };
  },
  introspection: true,
  playground: true,
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
