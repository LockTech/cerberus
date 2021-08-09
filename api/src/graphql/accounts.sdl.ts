export const schema = gql`
  type Account {
    id: ID!
    email: String!
    name: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    lastLoginAt: DateTime!
    organizationId: String
    organization: Organization
  }

  type Query {
    account(id: ID!): Account!
    accounts: [Account!]!
  }

  type Mutation {
    inviteAccount(email: String!): Boolean
    updateAccount(id: ID!, email: String, name: String): Account!
  }
`
