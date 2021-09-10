import { Router, Route, Set } from '@redwoodjs/router'

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
          <Route path="/role/{id}" page={RolePage} name="role" />
          {/* Organizations */}
          <Route path="/organization/settings" page={OrganizationSettingsPage} name="organizationSettings" />
        </Set>
        <Set prerender wrap={[AuthLayout]}>
          <Route path="/invite/confirmation" name="inviteConfirmation" page={AuthInviteConfirmationPage} />
          <Route path="/login" name="login" page={AuthLoginPage} />
          <Route path="/signup" name="signup" page={AuthSignupPage} />
          <Route path="/signup/confirmation" name="signupConfirmation" page={AuthSignupConfirmationPage} />
          <Route path="/signup/login" name="signupLogin" page={AuthSignupLoginPage} />
          <Route path="/signup/organization" name="signupOrganization" page={AuthSignupOrganizationPage} />
        </Set>
      </Set>
    </Router>
  )
}

export default Routes
