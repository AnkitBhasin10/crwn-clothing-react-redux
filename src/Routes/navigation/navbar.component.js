import { Outlet, Link } from 'react-router-dom'
import './navbar.styles.scss'
import { ReactComponent as Logo } from '../../assets/crown.svg'

const NavBar = () => {
  return (
    <>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <Logo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            Shop
          </Link>
          <Link className="nav-link" to="/contact">
            Contact
          </Link>
          <Link className="nav-link" to="/sign-in">
            SignIn
          </Link>
        </div>
      </div>
      <Outlet />
    </>
  )
}

export default NavBar
