export const schema = gql`
  type Organization {
    id: ID!
    name: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    accounts: [Account!]
  }

  type Query {
    organization: Organization!
  }

  type Mutation {
    createOrganization(name: String!): Organization
    updateOrganization(name: String): Organization
  }
`
