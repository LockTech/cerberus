import { atom } from 'recoil'

export const CurrentAccountSettingsModalAtom = atom<boolean>({
  key: 'CurrentAccountSettingsModal',
  default: false,
})
