import { Outlet } from 'react-router-dom'
import Navbar from './navigation/Navbar'
import Sidebar from './navigation/Sidebar'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'

const Layout = () => {
  const { theme, sidebarOpen } = useSelector((state: RootState) => state.ui)
  
  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className={`flex-1 p-4 transition-all ${sidebarOpen ? 'md:ml-64' : 'md:ml-20'}`}>
          <div className="container mx-auto py-4">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default Layout