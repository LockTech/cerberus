export const authModelAccessor = 'account'
export const authFields = {
  id: 'id',
  username: 'email',
  hashedPassword: 'hashedPassword',
  salt: 'salt',
}

export const loginErrors = {
  incorrectPassword: 'login-password',
  usernameNotFound: 'login-username',
  usernameOrPasswordMissing: 'login-missing',
}
/**
 * Amount of time a user will remain logged in, given in `seconds`.
 */
export const loginExpires = 60 * 60 * 24 // * 365 * 10,

export const signupErrors = {
  fieldMissing: 'signup-missing',
  usernameTaken: 'signup-username',
}
