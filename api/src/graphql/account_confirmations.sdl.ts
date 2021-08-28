export const schema = gql`
  type Account_Confirmation {
    id: ID!
    code: String!
    email: String!
    organizationId: ID
    created_at: DateTime!
  }

  type Mutation {
    confirmSignup(code: String!, email: String!): Boolean!
  }
`
