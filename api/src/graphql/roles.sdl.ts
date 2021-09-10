export const schema = gql`
  type Role {
    id: ID!
    name: String!
    color: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    organizationId: ID!
  }

  type Query {
    role(id: ID!): Role!
    roles(accountId: ID): [Role!]!
    #
  }

  type Mutation {
    createRole(name: String!): Role!
    deleteRole(id: ID!): Role!
    updateRole(id: ID!, color: String, name: String): Role!
    #
    addPermToRole(permissionId: ID!, roleId: ID!): Role!
    addRoleToAccount(accountId: ID!, roleId: ID!): Role!
    delPermFromRole(permissionId: ID!, roleId: ID!): Role!
    delRoleFromAccount(accountId: ID!, roleId: ID!): Role!
  }
`
