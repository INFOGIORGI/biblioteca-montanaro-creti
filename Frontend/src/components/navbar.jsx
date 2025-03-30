import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-500 text-white shadow-lg">
      <div className="cnt mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            
            <div className="hidden md:block">
              <ul className="flex justify-start gap-10 h-16 font-dinpro font-bold items-center">
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? 'text-black' : ''
                    }
                    end
                    to="/aggiungiLibri"
                  >
                    Aggiungi un libro
                  </NavLink>
                </li>

                <li>
                <NavLink
                    className={({ isActive }) =>
                      isActive ? 'text-black' : ''
                    }
                    end
                    to="/ricercaLibri"
                  >
                    Ricerca Libri
                  </NavLink>
                </li>

                <li>
                <NavLink
                    className={({ isActive }) =>
                      isActive ? 'text-black' : ''
                    }
                    end
                    to="/tuttiLibri"
                  >
                    Vedi tutti i libri
                  </NavLink>
                </li>
                <li>
                <NavLink
                    className={({ isActive }) =>
                      isActive ? 'text-black' : ''
                    }
                    end
                    to="/aggiungiAutori"
                  >
                    Aggiungi un autore
                  </NavLink>
                </li>
                <li>
                <NavLink
                    className={({ isActive }) =>
                      isActive ? 'text-black' : ''
                    }
                    end
                    to="/register"
                  >
                    Register
                  </NavLink>
                </li>
                <li>
                <NavLink
                    className={({ isActive }) =>
                      isActive ? 'text-black' : ''
                    }
                    end
                    to="/login"
                  >
                    Login
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-300 hover:text-white focus:outline-none focus:text-white"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M18.364 17.364a1 1 0 0 1-1.414 0L12 12.414l-4.95 4.95a1 1 0 0 1-1.414-1.414L10.586 11 5.636 6.05a1 1 0 0 1 1.414-1.414L12 9.586l4.95-4.95a1 1 0 0 1 1.414 1.414L13.414 11l4.95 4.95a1 1 0 0 1 0 1.414z"
                  />
                ) : (
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4 5h16M4 12h16m-7 7h7"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <ul className="flex flex-col items-center gap-4 p-4 font-dinpro font-bold  ">
          <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? 'text-black' : ''
                    }
                    end
                    to="/aggiungiLibri"
                  >
                    Aggiungi un libro
                  </NavLink>
                </li>

                <li>
                <NavLink
                    className={({ isActive }) =>
                      isActive ? 'text-black' : ''
                    }
                    end
                    to="/ricercaLibri"
                  >
                    Ricerca Libri
                  </NavLink>
                </li>

                <li>
                <NavLink
                    className={({ isActive }) =>
                      isActive ? 'text-black' : ''
                    }
                    end
                    to="/tuttiLibri"
                  >
                    Vedi tutti i libri
                  </NavLink>
                </li>
                <li>
                <NavLink
                    className={({ isActive }) =>
                      isActive ? 'text-black' : ''
                    }
                    end
                    to="/aggiungiAutori"
                  >
                    Aggiungi un autore
                  </NavLink>
                </li>
                
           
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;