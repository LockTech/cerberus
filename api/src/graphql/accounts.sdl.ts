export const schema = gql`
  type Account {
    id: ID!
    email: String!
    firstName: String!
    lastName: String!
    hashedPassword: String!
    salt: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    organizationId: String
    organization: Organization
  }

  type Query {
    account(id: String!): Account
    accounts: [Account!]!
    currentAccount: Account!
  }

  type Mutation {
    signupAccount(email: String!): Boolean
    inviteAccount(email: String!): Boolean
  }
`
