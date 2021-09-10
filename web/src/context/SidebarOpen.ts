import { atom } from 'recoil'

export const SidebarOpenAtom = atom<boolean>({
  key: 'SidebarOpen',
  default: false,
})
