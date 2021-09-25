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
    account(id: ID!): Account! @isAdmin @requireAuth
    accounts: [Account!]! @isAdmin @requireAuth
  }

  type Mutation {
    deleteAccount(id: ID!): Account! @isAdmin @requireAuth
    inviteAccount(email: String!): Boolean! @isAdmin @requireAuth
    updateAccount(
      id: ID!
      disabled: Boolean
      email: String
      name: String
    ): Account! @isAdmin @requireAuth
  }
`
