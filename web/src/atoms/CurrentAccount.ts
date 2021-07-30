import { atom } from 'recoil'

export interface CurrentAccount {
  id: string
  email: string
  firstName: string
  lastName: string
  organizationId: string | null
}

export const CurrentAccountAtom = atom<CurrentAccount>({
  key: 'CurrentAccount',
  default: null,
})
