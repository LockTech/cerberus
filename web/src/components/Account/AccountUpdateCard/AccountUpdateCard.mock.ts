export const standard = {
  account: {
    id: 'c7288601-dd86-444c-9a1c-6c586ffa24e4',
    email: 'joeseph.doe@gmail.com',
    name: 'Joeseph Doe',
  },
}

export const mockAccountUpdate = () => {
  mockCurrentUser({ id: '1' })

  mockGraphQLMutation('AccountUpdateMutation', (_v, { ctx }) => {
    ctx.delay(2000)
    return { ...standard }
  })
}

export const mockAccountUpdateError = () => {
  mockCurrentUser({ id: '1' })

  mockGraphQLMutation('AccountUpdateMutation', (_v, { ctx }) => {
    ctx.delay(2000)
    ctx.errors([{ message: 'account-update' }])
    return { ...standard }
  })
}
