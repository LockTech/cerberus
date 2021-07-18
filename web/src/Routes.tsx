import { Private, Router, Route, Set } from '@redwoodjs/router'

import AuthLayout from 'src/layouts/AuthLayout'

const Routes = () => {
  return (
    <Router>
      <Private unauthenticated="login">
        <Route path="/" page={HomePage} name="home" />
      </Private>
      <Set wrap={[AuthLayout]}>
        <Route path="/login" page={LoginPage} name="login" />
        <Route path="/signup" page={SignupPage} name="signup" />
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
