import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { useRecoilState } from 'recoil'
import { Transition } from '@headlessui/react'

import { SidebarOpenAtom } from 'src/context/SidebarOpen'

import SidebarNav from 'src/components/Sidebar/SidebarNav'

import { CopyrightURL } from 'src/constants/variables'

import { useCloseSidebarOnNavigate } from 'src/hooks/useCloseSidebarOnNavigate'
import { useScreenWidth } from 'src/hooks/useScreenWidth'

import './Sidebar.css'

const Sidebar = () => {
  const { t } = useTranslation()

  useCloseSidebarOnNavigate()

  const [sidebarOpen, setSidebarOpen] = useRecoilState(SidebarOpenAtom)

  const width = useScreenWidth()

  const responsiveSidebarOpen = width >= 1024

  return (
    <Transition
      as="section"
      className={clsx('dark', responsiveSidebarOpen && 'sidebar-container')}
      show={responsiveSidebarOpen || sidebarOpen}
    >
      {width < 1024 && (
        <Transition.Child
          as="div"
          className="sidebar-overlay"
          enter="duration-100 ease-in-out transition-opacity"
          enterFrom="opacity-0"
          enterTo="opacity-50"
          leave="duration-200 ease-in-out transition-opacity"
          leaveFrom="opacity-50"
          leaveTo="opacity-0"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <Transition.Child
        className="sidebar"
        enter="duration-300 ease-in-out transition-all transform-gpu"
        enterFrom="-translate-x-64 lg:translate-x-0 opacity-0"
        enterTo="translate-x-0 opacity-100"
        leave="duration-200 ease-in-out transition-all transform-gpu"
        leaveFrom="translate-x-0 opacity-100"
        leaveTo="-translate-x-64 lg:translate-x-0 opacity-0"
      >
        <div>
          <header className="title-group">
            <h1>{t('Sidebar.title')}</h1>
            <p>{t('Sidebar.subtitle')}</p>
          </header>
          <SidebarNav />
        </div>
        <footer className="copyright">
          <a
            className="link-gray"
            href={CopyrightURL}
            target="_blank"
            rel="noreferrer"
          >
            © 2021 LockTech Software
          </a>
        </footer>
      </Transition.Child>
    </Transition>
  )
}

export default Sidebar
