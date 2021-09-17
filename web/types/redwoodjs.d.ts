import type { CurrentUser as ICurrentUser } from 'types/auth'

import '@redwoodjs/auth'
declare module '@redwoodjs/auth' {
  export interface CurrentUser extends ICurrentUser {}
}
