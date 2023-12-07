import { gql } from "@apollo/client";
import { GraphQLScalarType, Kind, GraphQLScalarLiteralParser } from "graphql";
import { makeExecutableSchema } from "@graphql-tools/schema";
import GraphQLJSON from "graphql-type-json";

// GraphQL Schema definition.
const typeDefs = gql`
  scalar Json
  scalar Date
`;

const resolvers = {
  Json: GraphQLJSON,
  Date: new GraphQLScalarType({
    name: "Date",
    description: "Date custom scalar type",
    parseValue(value: string) {
      return new Date(value); // value from the client
    },
    serialize(value: Date) {
      return value.getTime(); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(ast.value);
      }
      return null;
    }
  })
};

// GraphQL Schema, required to use the link
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

export { schema };
