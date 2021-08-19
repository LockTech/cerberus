export const standard = {
  account: {
    id: 'c7288601-dd86-444c-9a1c-6c586ffa24e4',
    email: 'john.doe@gmail.com',
    name: 'John Doe',
  },
}

export const mockAccount = () => {
  mockCurrentUser({ id: '1' })

  mockGraphQLQuery('AccountUpdateQuery', (_v, { ctx }) => {
    ctx.delay(2000)
    return standard
  })

  mockGraphQLMutation('AccountUpdateMutation', (_v, { ctx }) => {
    ctx.delay(2000)
    return { ...standard }
  })
}

export const mockAccountError = () => {
  mockCurrentUser({ id: '1' })

  mockGraphQLQuery('AccountUpdateQuery', (_v, { ctx }) => {
    ctx.delay(2000)
    return standard
  })

  mockGraphQLMutation('AccountUpdateMutation', (_v, { ctx }) => {
    ctx.delay(2000)
    ctx.errors([{ message: 'account-update' }])
    return { ...standard }
  })
}
