import { Router, Route, Set } from '@redwoodjs/router'

import AuthLayout from 'src/layouts/AuthLayout'
import ColorModeLayout from 'src/layouts/ColorModeLayout'
import CurrentAccountLayout from 'src/layouts/CurrentAccountLayout'
import DashboardLayout from 'src/layouts/DashboardLayout'
import CreateOrganizationLayout from 'src/layouts/CreateOrganizationLayout'

const Routes = () => {
  return (
    <Router>
      <Set wrap={[ColorModeLayout]}>
        <Set private unauthenticated="login" wrap={[CurrentAccountLayout, DashboardLayout, CreateOrganizationLayout]}>
          {/* General */}
          <Route notfound page={NotFoundPage} />
          <Route path="/" page={HomePage} name="home" />
          {/* Accounts */}
          <Route path="/accounts" page={ListAccountsPage} name="listAccounts" />
          {/* Organizations */}
          <Route path="/organization/settings" page={OrganizationSettingsPage} name="organizationSettings" />
        </Set>
        <Set prerender wrap={[AuthLayout]}>
          {/* Auth */}
          <Route name="login" path="/login" page={LoginPage} />
          <Route name="signup" path="/signup" page={SignupPage} />
          {/* Confirmation */}
          <Route name="signupConfirmation" path="/signup/confirmation" page={SignupConfirmationPage} />
          <Route name="inviteConfirmation" path="/invite/confirmation" page={InviteConfirmationPage} />
        </Set>
      </Set>
    </Router>
  )
}

export default Routes
