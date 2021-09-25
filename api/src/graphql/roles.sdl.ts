export const schema = gql`
  type Role {
    id: ID!
    name: String!
    color: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    organizationId: ID!
    accounts: [Account!]!
    permissions: [Permission!]!
  }

  type Query {
    role(id: ID!): Role! @isAdmin @requireAuth
    roles(accountId: ID): [Role!]! @isAdmin @requireAuth
    #
  }

  type Mutation {
    createRole(name: String!): Role! @isAdmin @requireAuth
    deleteRole(id: ID!): Role! @isAdmin @requireAuth
    updateRole(id: ID!, color: String, name: String): Role!
      @isAdmin
      @requireAuth
    #
    addPermToRole(permissionId: ID!, roleId: ID!): Role! @isAdmin @requireAuth
    addRoleToAccount(accountId: ID!, roleId: ID!): Role! @isAdmin @requireAuth
    delPermFromRole(permissionId: ID!, roleId: ID!): Role! @isAdmin @requireAuth
    delRoleFromAccount(accountId: ID!, roleId: ID!): Role! @isAdmin @requireAuth
  }
`
