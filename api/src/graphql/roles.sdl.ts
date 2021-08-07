export const schema = gql`
  type Role {
    id: ID!
    name: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    organizationId: ID!
    organization: Organization!
    accounts: [Account]!
    permissions: [Permission]!
  }

  type Query {
    role(id: ID!): Role!
    roles: [Role!]!
  }

  type Mutation {
    createRole(name: String!): Role!
    deleteRole(id: String!): Role!
  }
`
