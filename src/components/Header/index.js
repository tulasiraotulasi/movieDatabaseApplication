// import {MdOutlineLocalMovies} from 'react-icons/md'
import {Link} from 'react-router-dom'

import './index.css'
// <MdOutlineLocalMovies className="logo" />
const Header = () => (
  <nav className="header-container">
    <div className="logo-and-title-container">
      <h1 className="title">movieDB</h1>
    </div>

    <ul className="nav-items-list">
      <li className="link-item">
        <Link className="route-link" to="/">
          Popular
        </Link>
      </li>
      <li className="link-item">
        <Link className="route-link" to="/top-rated">
          Top Rated
        </Link>
      </li>
      <li className="link-item">
        <Link className="route-link" to="/upcoming">
          Upcoming
        </Link>
      </li>
    </ul>
  </nav>
)

export default Header
