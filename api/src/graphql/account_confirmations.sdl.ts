export const schema = gql`
  type Account_Confirmation {
    id: ID!
    code: String!
    email: String!
    organizationId: String
    created_at: DateTime!
  }

  # type Query {}

  type Mutation {
    confirmSignup(code: String!, email: String!): Boolean!
  }
`
