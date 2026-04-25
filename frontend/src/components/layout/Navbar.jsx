import { NavLink } from "react-router-dom"
import PropTypes from "prop-types"
import { TEXTS } from "../../config/texts"
import { ROUTES } from "../../config/config"

export default function Navbar({ onSalir }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">{TEXTS.APP_NAME} <span className="navbar-emoji">🎵</span></div>
      <div className="navbar-links">
        <NavLink to={ROUTES.HOME} end className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          {TEXTS.NAV.HOME}
        </NavLink>
        <NavLink to={ROUTES.CANCIONES} className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          {TEXTS.NAV.CANCIONES}
        </NavLink>
        <NavLink to={ROUTES.ABOUT} className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          {TEXTS.NAV.ABOUT}
        </NavLink>
      </div>
      <button className="btn btn-ghost" onClick={onSalir}>{TEXTS.CANCIONES.BTN_LOGOUT}</button>
    </nav>
  )
}

Navbar.propTypes = {
  onSalir: PropTypes.func.isRequired,
}
