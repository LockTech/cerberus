import type { CurrentAccount } from 'src/atoms/CurrentAccount'
import { useAuth } from '@redwoodjs/auth'

/**
 * @returns `useAuth().currentUser` with typings applied
 */
export const useCurrentAccount = () => useAuth().currentUser as CurrentAccount
