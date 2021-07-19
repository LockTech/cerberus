import { Private, Router, Route, Set } from '@redwoodjs/router'

import AuthLayout from 'src/layouts/AuthLayout'
import ColorModeLayout from 'src/layouts/ColorModeLayout'
import DashboardLayout from 'src/layouts/DashboardLayout'

const Routes = () => {
  return (
    <Router>
      <Set wrap={[ColorModeLayout]}>
        <Private wrap={[DashboardLayout]} unauthenticated="login">
          <Route path="/" page={HomePage} name="home" />
          <Route notfound page={NotFoundPage} />
        </Private>
        <Set wrap={[AuthLayout]}>
          <Route path="/login" page={LoginPage} name="login" />
          <Route path="/signup" page={SignupPage} name="signup" />
        </Set>
      </Set>
    </Router>
  )
}

export default Routes
