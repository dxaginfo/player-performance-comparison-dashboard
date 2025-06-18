import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { RootState } from '@/store'

const Sidebar = () => {
  const { sidebarOpen } = useSelector((state: RootState) => state.ui)
  
  const navItems = [
    { path: '/', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', label: 'Dashboard' },
    { path: '/search', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z', label: 'Player Search' },
    { path: '/compare', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', label: 'Player Comparison' },
    { path: '/teams', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z', label: 'Teams' },
    { path: '/stats', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', label: 'League Stats' },
  ]
  
  return (
    <div 
      className={`bg-white dark:bg-gray-800 h-screen fixed left-0 top-16 transform transition-all duration-300 ease-in-out shadow-md z-40
      ${sidebarOpen ? 'w-64' : 'w-20'} pt-5`}
    >
      <div className="overflow-y-auto h-full">
        <ul className="space-y-2 px-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) => 
                  `flex items-center p-3 text-base font-normal rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 ${isActive ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-100' : 'text-gray-900 dark:text-white'}`
                }
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon}></path>
                </svg>
                <span className={`ml-3 ${!sidebarOpen && 'hidden'}`}>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
        
        <div className="px-4 mt-10">
          {sidebarOpen && (
            <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
              <h5 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                Popular Comparisons
              </h5>
              <ul className="space-y-2">
                <li>
                  <NavLink 
                    to="/compare?players=lebron-james,michael-jordan" 
                    className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 text-sm"
                  >
                    LeBron vs Jordan
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="/compare?players=stephen-curry,damian-lillard" 
                    className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 text-sm"
                  >
                    Curry vs Lillard
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="/compare?players=kevin-durant,giannis-antetokounmpo" 
                    className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 text-sm"
                  >
                    Durant vs Giannis
                  </NavLink>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Sidebar