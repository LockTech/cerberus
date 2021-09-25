export const schema = gql`
  type Organization {
    id: ID!
    name: String!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    organization: Organization! @isAdmin @requireAuth
  }

  type Mutation {
    createOrganization(name: String!, adminRoleName: String!): Organization!
      @requireAuth
    updateOrganization(name: String): Organization! @isAdmin @requireAuth
    deleteOrganization: Organization! @isAdmin @requireAuth
  }
`
