import { useEffect, useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { useLocation } from '@redwoodjs/router'

import { SidebarOpenAtom } from 'src/atoms/SidebarOpen'

export const useCloseSidebarOnNavigate = () => {
  const setSidebarOpen = useSetRecoilState(SidebarOpenAtom)
  const location = useLocation()

  const [currentLocation, setCurrentLocation] = useState('')

  useEffect(() => {
    if (currentLocation !== location.pathname) {
      setCurrentLocation(location.pathname)
      setSidebarOpen(false)
    }
  }, [currentLocation, location, setCurrentLocation, setSidebarOpen])
}
