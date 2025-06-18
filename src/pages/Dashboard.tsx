import { Link } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <header className="text-center py-8">
        <h1 className="text-3xl font-bold mb-2">NBA Player Performance Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Compare player statistics, analyze performance trends, and visualize data across seasons
        </p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Quick Actions Card */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link to="/search" className="btn-primary w-full block text-center">
              Search Players
            </Link>
            <Link to="/compare" className="btn-secondary w-full block text-center">
              Compare Players
            </Link>
          </div>
        </div>
        
        {/* Featured Comparisons */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Featured Comparisons</h2>
          <ul className="space-y-3">
            <li>
              <Link 
                to="/compare?players=lebron-james,michael-jordan" 
                className="block p-3 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <span className="font-medium">LeBron James vs. Michael Jordan</span>
                <p className="text-sm text-gray-600 dark:text-gray-300">All-time greats head-to-head</p>
              </Link>
            </li>
            <li>
              <Link 
                to="/compare?players=stephen-curry,damian-lillard" 
                className="block p-3 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <span className="font-medium">Stephen Curry vs. Damian Lillard</span>
                <p className="text-sm text-gray-600 dark:text-gray-300">Elite point guard showdown</p>
              </Link>
            </li>
            <li>
              <Link 
                to="/compare?players=kevin-durant,giannis-antetokounmpo" 
                className="block p-3 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <span className="font-medium">Kevin Durant vs. Giannis Antetokounmpo</span>
                <p className="text-sm text-gray-600 dark:text-gray-300">Modern forwards comparison</p>
              </Link>
            </li>
          </ul>
        </div>
        
        {/* Stats Categories */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Explore Stats</h2>
          <div className="grid grid-cols-2 gap-3">
            <Link 
              to="/stats?category=scoring" 
              className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-md text-center hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
            >
              Scoring
            </Link>
            <Link 
              to="/stats?category=shooting" 
              className="p-3 bg-green-50 dark:bg-green-900/30 rounded-md text-center hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors"
            >
              Shooting
            </Link>
            <Link 
              to="/stats?category=playmaking" 
              className="p-3 bg-yellow-50 dark:bg-yellow-900/30 rounded-md text-center hover:bg-yellow-100 dark:hover:bg-yellow-900/50 transition-colors"
            >
              Playmaking
            </Link>
            <Link 
              to="/stats?category=defense" 
              className="p-3 bg-red-50 dark:bg-red-900/30 rounded-md text-center hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors"
            >
              Defense
            </Link>
            <Link 
              to="/stats?category=advanced" 
              className="p-3 bg-purple-50 dark:bg-purple-900/30 rounded-md text-center hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors col-span-2"
            >
              Advanced Metrics
            </Link>
          </div>
        </div>
      </div>
      
      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="card bg-primary-50 dark:bg-primary-900/20 border border-primary-100 dark:border-primary-900">
          <h3 className="text-lg font-semibold mb-2 text-primary-800 dark:text-primary-300">Player Profiles</h3>
          <p className="text-primary-700 dark:text-primary-400 text-sm">
            Search for any current or former NBA player to view comprehensive statistics, career highlights, and performance trends.
          </p>
        </div>
        
        <div className="card bg-secondary-50 dark:bg-secondary-900/20 border border-secondary-100 dark:border-secondary-900">
          <h3 className="text-lg font-semibold mb-2 text-secondary-800 dark:text-secondary-300">Side-by-Side Comparison</h3>
          <p className="text-secondary-700 dark:text-secondary-400 text-sm">
            Compare up to four players across different statistical categories with interactive visualizations and analysis.
          </p>
        </div>
        
        <div className="card bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-900">
          <h3 className="text-lg font-semibold mb-2 text-green-800 dark:text-green-300">Advanced Analytics</h3>
          <p className="text-green-700 dark:text-green-400 text-sm">
            Dive deep into advanced metrics, including player efficiency rating, true shooting percentage, and win shares.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard