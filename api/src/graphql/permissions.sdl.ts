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

  type Query {
    permissions: [Permission!]!
  }
`
