import { atom } from 'recoil'

export const AppbarTitleAtom = atom<string>({
  key: 'AppbarTitle',
  default: 'Cerberus',
})
