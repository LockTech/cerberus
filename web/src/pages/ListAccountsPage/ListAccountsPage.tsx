import { Link, routes } from '@redwoodjs/router'

const ListAccountsPage = () => {
  return (
    <>
      <h1>ListAccountsPage</h1>
      <p>
        Find me in{' '}
        <code>./web/src/pages/ListAccountsPage/ListAccountsPage.tsx</code>
      </p>
      <p>
        My default route is named <code>listAccounts</code>, link to me with `
        <Link to={routes.listAccounts()}>ListAccounts</Link>`
      </p>
    </>
  )
}

export default ListAccountsPage
