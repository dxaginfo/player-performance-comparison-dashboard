# Player Performance Comparison Dashboard

An interactive web application for comparing NBA player performance metrics across seasons, teams, and statistical categories.

![Player Performance Dashboard Preview](https://via.placeholder.com/800x450?text=Player+Performance+Comparison+Dashboard)

## 🏀 Overview

The Player Performance Comparison Dashboard allows basketball fans, analysts, and coaches to:

- Compare multiple players side-by-side using a variety of statistical metrics
- Visualize performance trends over time with interactive charts
- Normalize statistics based on minutes played, per-36 minutes, or per-100 possessions
- Highlight strengths and weaknesses through radar charts and heatmaps
- Track player development trajectories throughout their careers

## ✨ Features

- **Multi-Player Comparison**: Select up to 4 players to compare simultaneously
- **Comprehensive Stats**: Access traditional stats, advanced metrics, and play-type data
- **Interactive Visualizations**: 
  - Line charts for season-by-season progression
  - Radar charts for skill set comparison
  - Shot charts with zone-based efficiency
  - Per-game performance timelines
- **Flexible Filtering**:
  - Filter by season, team, opponent, or game type
  - Compare regular season vs. playoff performance
  - Focus on specific date ranges
- **Performance Context**:
  - Compare against league averages
  - Highlight statistical outliers
  - View percentile rankings for each metric

## 🛠️ Technology Stack

- **Frontend**: React with TypeScript
- **State Management**: Redux Toolkit
- **Visualization**: D3.js and Chart.js
- **Styling**: Tailwind CSS
- **Backend**: Node.js with Express
- **Database**: MongoDB for player data caching
- **API**: Integration with basketball-reference.com and NBA Stats API

## 🚀 Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn
- MongoDB (optional for local development)

### Installation

```bash
# Clone the repository
git clone https://github.com/dxaginfo/player-performance-comparison-dashboard.git
cd player-performance-comparison-dashboard

# Install dependencies
npm install

# Start the development server
npm run dev
```

## 📊 Data Sources

The application uses data from:
- Public NBA statistics
- Basketball-reference.com historical data
- Additional advanced metrics calculations

## 📱 Responsive Design

The dashboard is fully responsive and works on:
- Desktop browsers
- Tablets
- Mobile devices

## 🔮 Future Enhancements

- Player similarity finder
- Custom stat formulas
- Team comparison mode
- Export comparisons as shareable images
- Fantasy basketball integration

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

Created by dxaginfo

## 🙏 Acknowledgments

- Basketball Reference for statistical data
- NBA Stats API for additional metrics
- The open-source community for visualization tools and libraries