import { useTranslation } from 'react-i18next'
import { useRecoilState } from 'recoil'
import { Transition } from '@headlessui/react'

import { SidebarOpenAtom } from 'src/atoms/SidebarOpen'

import { useCloseSidebarOnNavigate } from 'src/hooks/useCloseSidebarOnNavigate'
import { useScreenWidth } from 'src/hooks/useScreenWidth'

import './Sidebar.css'
import SidebarNav from './SidebarNav/SidebarNav'

const Sidebar = () => {
  const { t } = useTranslation()

  useCloseSidebarOnNavigate()

  const [sidebarOpen, setSidebarOpen] = useRecoilState(SidebarOpenAtom)

  const width = useScreenWidth()

  const responsiveSidebarOpen = width >= 1024 ? true : sidebarOpen

  return (
    <>
      {width < 1024 && (
        <Transition
          as="div"
          aria-hidden="true"
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
          enter="duration-100 ease-in-out transition-opacity"
          enterFrom="opacity-0"
          enterTo="opacity-50"
          leave="duration-100 ease-in-out transition-opacity"
          leaveFrom="opacity-50"
          leaveTo="opacity-0"
          show={responsiveSidebarOpen}
        />
      )}
      <Transition
        appear
        className="sidebar"
        enter="duration-300 ease-in-out transition-transform transform-gpu"
        enterFrom="-translate-x-64 opacity-0"
        enterTo="translate-x-0 opacity-100"
        leave="duration-300 ease-in-out transition-transform transform-gpu"
        leaveFrom="translate-x-0 opacity-100"
        leaveTo="-translate-x-64 opacity-0"
        show={responsiveSidebarOpen}
      >
        <div className="title">
          <h1>{t('Sidebar.title')}</h1>
          <p>{t('Sidebar.subtitle')}</p>
        </div>
        <SidebarNav />
      </Transition>
    </>
  )
}

export default Sidebar
