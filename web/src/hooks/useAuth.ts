import { useAuth as useRWAuth } from '@redwoodjs/auth'
import type { AuthContextInterface as RWAuthContextInterface } from '@redwoodjs/auth'

export interface CurrentUser {
  id: string
  email: string
  name: string
  organization?: {
    id: string
    name: string
  }
}

export interface AuthContextInterface extends RWAuthContextInterface {
  currentUser: CurrentUser
}

/**
 * Wrapper around Redwood's `useAuth` hook, providing application-specific typings.
 */
export const useAuth = () => useRWAuth() as AuthContextInterface
