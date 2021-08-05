import { atom } from 'recoil'

export interface CurrentAccount {
  id: string
  email: string
  name: string
  organization?: {
    id: string
    name: string
  }
}

export const CurrentAccountAtom = atom<CurrentAccount>({
  key: 'CurrentAccount',
  default: null,
})
