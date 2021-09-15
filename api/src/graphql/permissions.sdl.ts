export const schema = gql`
  type Permission {
    id: ID!
    application: String!
    namespace: String!
    object: String!
    relation: String!
    created_at: DateTime!
    updated_at: DateTime!
  }

  type ApplicationPermissions {
    application: String!
    permissions: [Permission!]!
  }

  type Query {
    applicationPermissions: [ApplicationPermissions!]!
  }
`
