export const schema = gql`
  type Organization {
    id: String!
    name: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    accounts: [Account]!
  }

  type Query {
    organizations: [Organization!]!
  }

  input CreateOrganizationInput {
    name: String!
  }

  input UpdateOrganizationInput {
    name: String
  }
`
