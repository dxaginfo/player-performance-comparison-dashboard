import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toggleSidebar, toggleTheme } from '@/store/slices/uiSlice'
import { RootState } from '@/store'
import SearchBar from './SearchBar'

const Navbar = () => {
  const dispatch = useDispatch()
  const { theme } = useSelector((state: RootState) => state.ui)
  
  return (
    <nav className="bg-primary-700 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button 
              onClick={() => dispatch(toggleSidebar())}
              className="p-2 rounded-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Toggle sidebar"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            <Link to="/" className="ml-4 flex items-center space-x-2">
              <img src="/basketball-icon.svg" alt="Logo" className="h-8 w-8" />
              <span className="font-bold text-xl hidden md:block">Player Comparison</span>
            </Link>
          </div>
          
          <div className="flex-1 mx-10 max-w-xl hidden md:block">
            <SearchBar />
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => dispatch(toggleTheme())}
              className="p-2 rounded-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
            
            <Link 
              to="/compare"
              className="bg-secondary-600 hover:bg-secondary-700 px-4 py-2 rounded-md hidden md:block"
            >
              Compare Players
            </Link>
          </div>
        </div>
      </div>
      
      <div className="md:hidden px-4 pb-4">
        <SearchBar />
      </div>
    </nav>
  )
}

export default Navbar