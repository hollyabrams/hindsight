import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import UserContext from '../UserContext';

function Navbar() {
  const { currentUser, logout } = useContext(UserContext);

  const loggedIn = Boolean(currentUser); // Converts currentUser to a boolean to check if user is logged in
  
  const navItems = loggedIn
    ? [
        { to: '/profile', name: 'Profile' },
        { to: '/dashboard', name: 'Dashboard' },
        { to: '/', name: `Log out, ${currentUser.firstName || currentUser.username}`, onClick: logout },
      ]
    : [
        { to: '/login', name: 'Login' },
        { to: '/register', name: 'Register' },
      ];

  return (
    <header className={'bg-gray-800 text-gray-300 fixed top-0 left-0 w-full z-50'}>
      <div className="container mx-auto flex flex-wrap p-7 flex-col md:flex-row items-center">
        <a href="/" className={'title-font font-medium text-white md:mb-0'}>
          Hindsight
        </a>
        <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-500 flex flex-wrap items-center text-base justify-center">
          {navItems.map((item, idx) => (
            <NavLink
              className="mr-5 hover:text-gray-400"
              key={idx}
              to={item.to}
              onClick={item.onClick}
            >
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;

