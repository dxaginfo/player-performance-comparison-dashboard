import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

interface StatComparisonBarChartProps {
  playersData: {
    id: string;
    name: string;
    color: string;
    values: Record<string, number>;
  }[];
  statCategories: { id: string; name: string }[];
  title?: string;
  horizontal?: boolean;
}

const StatComparisonBarChart = ({
  playersData,
  statCategories,
  title = 'Statistical Comparison',
  horizontal = false,
}: StatComparisonBarChartProps) => {
  const { theme } = useSelector((state: RootState) => state.ui)
  
  const options = {
    indexAxis: horizontal ? 'y' as const : 'x' as const,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: theme === 'dark' ? '#e5e7eb' : '#1f2937',
        }
      },
      title: {
        display: !!title,
        text: title,
        color: theme === 'dark' ? '#e5e7eb' : '#1f2937',
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const value = context.raw;
            return `${context.dataset.label}: ${value.toFixed(1)}`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: theme === 'dark' ? '#e5e7eb' : '#1f2937',
        }
      },
      y: {
        grid: {
          color: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: theme === 'dark' ? '#e5e7eb' : '#1f2937',
        }
      }
    },
  }
  
  const labels = statCategories.map(cat => cat.name)
  
  const datasets = playersData.map(player => ({
    label: player.name,
    data: statCategories.map(cat => player.values[cat.id] || 0),
    backgroundColor: player.color,
    borderColor: player.color,
    borderWidth: 1,
  }))
  
  const data = {
    labels,
    datasets,
  }
  
  return (
    <div className="w-full h-80">
      <Bar options={options} data={data} />
    </div>
  )
}

export default StatComparisonBarChart