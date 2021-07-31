import { Private, Router, Route, Set } from '@redwoodjs/router'

import AuthLayout from 'src/layouts/AuthLayout'
import ColorModeLayout from 'src/layouts/ColorModeLayout'
import CurrentAccountLayout from 'src/layouts/CurrentAccountLayout'
import DashboardLayout from 'src/layouts/DashboardLayout'
import CreateOrganizationLayout from 'src/layouts/CreateOrganizationLayout'

const Routes = () => {
  return (
    <Router>
      <Set wrap={[ColorModeLayout]}>
        <Private wrap={[CurrentAccountLayout, DashboardLayout, CreateOrganizationLayout]} unauthenticated="login">
          <Route notfound page={NotFoundPage} />
          <Route path="/" page={HomePage} name="home" />
          <Route path="/accounts" page={ListAccountsPage} name="listAccounts" />
        </Private>
        <Set wrap={[AuthLayout]}>
          <Route name="login" path="/login" page={LoginPage} prerender />
          <Route name="signup" path="/signup" page={SignupPage} prerender />
          <Route name="signupConfirmation" path="/signup/confirmation" page={SignupConfirmationPage} prerender />
          <Route name="inviteConfirmation" path="/invite/confirmation" page={InviteConfirmationPage} prerender />
        </Set>
      </Set>
    </Router>
  )
}

export default Routes
