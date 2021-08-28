export const schema = gql`
  type Account {
    id: ID!
    email: String!
    disabled: Boolean!
    name: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    lastLoginAt: DateTime!
    organizationId: ID
    roles: [Role!]!
    verified: Boolean!
    verifiedAt: DateTime
  }

  type Query {
    account(id: ID!): Account!
    accounts: [Account!]!
  }

  type Mutation {
    inviteAccount(email: String!): Boolean!
    updateAccount(
      id: ID!
      disabled: Boolean
      email: String
      name: String
    ): Account!
  }
`
