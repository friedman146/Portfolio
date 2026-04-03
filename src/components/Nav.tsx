import { NavLink } from 'react-router-dom'

function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-10 py-6">
      <NavLink
        to="/"
        className="text-beige text-sm tracking-widest uppercase"
      >
        Paul Friedman
      </NavLink>
      <ul className="flex gap-8">
        {[
          { to: '/projects', label: 'Projects' },
          { to: '/about', label: 'About' },
          { to: '/contact', label: 'Contact' },
        ].map(({ to, label }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                `text-xs tracking-widest uppercase transition-colors duration-300 ${
                  isActive ? 'text-beige' : 'text-silver/60 hover:text-beige'
                }`
              }
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Nav
