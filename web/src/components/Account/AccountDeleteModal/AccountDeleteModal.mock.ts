export const standard = {
  account: {
    name: 'Joeseph Doe',
  },
}

export const mockAccountDelete = () => {
  mockCurrentUser({ id: '1' })

  mockGraphQLMutation('AccountDeleteMutation', (_v, { ctx }) => {
    ctx.delay(2000)
    return { ...standard }
  })
}

export const mockAccountDeleteError = () => {
  mockCurrentUser({ id: '1' })

  mockGraphQLMutation('AccountDeleteMutation', (_v, { ctx }) => {
    ctx.delay(2000)
    ctx.errors([{ message: 'account-delete' }])
    return { ...standard }
  })
}
