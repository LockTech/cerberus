export const standard = {
  account: {
    id: 'c7288601-dd86-444c-9a1c-6c586ffa24e4',
    disabled: false,
    email: 'john.doe@gmail.com',
    name: 'John Doe',
  },
}

export const mockAccountDetail = () => {
  mockCurrentUser({ id: '1' })

  mockGraphQLQuery('AccountDetailQuery', (_v, { ctx }) => {
    ctx.delay(2000)
    return standard
  })
}

export const mockAccountDetailError = () => {
  mockCurrentUser({ id: '1' })

  mockGraphQLQuery('AccountDetailQuery', (_v, { ctx }) => {
    ctx.delay(2000)
    return standard
  })
}
