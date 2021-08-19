import { Private, Router, Route, Set } from '@redwoodjs/router'

import AuthLayout from 'src/layouts/AuthLayout'
import ColorModeLayout from 'src/layouts/ColorModeLayout'
import CurrentAccountLayout from 'src/layouts/CurrentAccountLayout'
import DashboardLayout from 'src/layouts/DashboardLayout'

const Routes = () => {
  return (
    <Router>
      <Set wrap={[ColorModeLayout]}>
        <Route notfound page={NotFoundPage} />
        <Set private unauthenticated="login" wrap={[CurrentAccountLayout, DashboardLayout]}>
          {/* General */}
          <Route path="/" page={HomePage} name="home" />
          {/* Accounts */}
          <Route path="/accounts" page={AccountListPage} name="listAccounts" />
          <Route path="/account/{id}" page={AccountPage} name="account" />
          {/* Roles */}
          <Route path="/roles" page={RoleListPage} name="listRoles" />
          {/* Organizations */}
          <Route path="/organization/settings" page={OrganizationSettingsPage} name="organizationSettings" />
        </Set>
        <Set prerender wrap={[AuthLayout]}>
          <Private unauthenticated="signup">
            <Route path="/signup/organization" page={SignupOrganizationPage} name="signupOrganization" />
          </Private>
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
