import { Link, routes } from '@redwoodjs/router'

const HomePage = () => {
  return (
    <div className="text">
      <h1>HomePage</h1>
      <p>
        Find me in <code>./web/src/pages/HomePage/HomePage.tsx</code>
      </p>
      <p>
        My default route is named <code>home</code>, link to me with `
        <Link to={routes.home()}>Home</Link>`
      </p>
    </div>
  )
}

export default HomePage
