import { useAuth } from '@redwoodjs/auth'

export interface CurrentAccount {
  id: string
  email: string
  name: string
  organization?: {
    id: string
    name: string
  }
}

/**
 * @returns `useAuth().currentUser` with typings applied
 */
export const useCurrentAccount = () => useAuth().currentUser as CurrentAccount
