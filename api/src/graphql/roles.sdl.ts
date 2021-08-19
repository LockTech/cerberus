export const schema = gql`
  type Role {
    id: ID!
    name: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    organizationId: ID!
    # organization: Organization!
    # accounts: [Account!]!
    # permissions: [Permission!]!
  }

  type Query {
    role(id: ID!): Role!
    roles: [Role!]!
  }

  type Mutation {
    createRole(name: String!): Role!
    deleteRole(id: ID!): Role!
    updateRole(id: ID!, name: String): Role!
    #
    addPermToRole(permissionId: ID!, roleId: ID!): Role!
    addRoleToAccount(accountId: ID!, roleId: ID!): Role!
    delPermFromRole(permissionId: ID!, roleId: ID!): Role!
    delRoleFromAccount(accountId: ID!, roleId: ID!): Role!
  }
`
