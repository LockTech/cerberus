export const authModelAccessor = 'account'
export const authFields = {
  id: 'id',
  username: 'email',
  hashedPassword: 'hashedPassword',
  salt: 'salt',
}
export const loginExpires = 60 * 60 * 24 // * 365 * 10,
