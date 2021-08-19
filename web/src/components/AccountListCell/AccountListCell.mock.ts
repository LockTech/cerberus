export const standard = {
  accounts: [
    {
      email: 'john.doe@example.net',
      id: 'c7288601-dd86-444c-9a1c-6c586ffa24e4',
      name: 'John Doe',
      lastLoginAt: '2021-08-06T01:28:30+0000',
      verifiedAt: '2021-08-01T02:28:30+0000',
    },
    {
      email: 'jane.doe@example.net',
      id: '1f920594-2faf-4f31-8659-3cf9a9da8667',
      name: 'Jane Doe',
      lastLoginAt: '2021-08-06T01:28:30+0000',
      verifiedAt: '2021-08-01T02:28:30+0000',
    },
    {
      email: 'adumbledorable@example.net',
      id: 'aedc0d0a-7c27-4fa4-9efa-25aa51aa5d9f',
      name: 'Albus Dumbledore',
      lastLoginAt: '2021-08-06T01:28:30+0000',
      verifiedAt: '2021-08-01T02:28:30+0000',
    },
    {
      email: 'notsuperman@example.net',
      id: 'b3472402-4e85-4e64-b693-7e7450b0b8a2',
      name: 'Clark Kent',
      lastLoginAt: '2021-08-06T01:28:30+0000',
      verifiedAt: '2021-08-01T02:28:30+0000',
    },
    {
      email: 'lowodor@example.net',
      id: '252b54d0-631c-465c-9c07-0e9d8758ff03',
      name: 'Dry Erase Marker',
      lastLoginAt: '2021-08-06T01:28:30+0000',
      verifiedAt: '2021-08-01T02:28:30+0000',
    },
  ],
}

export const mockAccountList = () => {
  mockGraphQLQuery('AccountListQuery', (_v, { ctx }) => {
    ctx.delay(2000)
    return standard
  })
}
