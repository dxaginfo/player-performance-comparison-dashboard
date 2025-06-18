import { useRef, useEffect } from 'react'
import * as d3 from 'd3'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'

interface RadarChartProps {
  data: {
    player: string;
    values: { [key: string]: number };
    color: string;
  }[];
  categories: { id: string; name: string }[];
  maxValue?: number;
  width?: number;
  height?: number;
}

const PlayerComparisonRadarChart = ({
  data,
  categories,
  maxValue = 100,
  width = 500,
  height = 500
}: RadarChartProps) => {
  const svgRef = useRef<SVGSVGElement>(null)
  const { theme } = useSelector((state: RootState) => state.ui)
  
  useEffect(() => {
    if (!svgRef.current || !data.length) return
    
    const textColor = theme === 'dark' ? '#e5e7eb' : '#1f2937'
    const gridColor = theme === 'dark' ? '#4b5563' : '#d1d5db'
    
    // Clear previous chart
    d3.select(svgRef.current).selectAll('*').remove()
    
    const margin = { top: 50, right: 50, bottom: 50, left: 50 }
    const chartWidth = width - margin.left - margin.right
    const chartHeight = height - margin.top - margin.bottom
    const radius = Math.min(chartWidth, chartHeight) / 2
    
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`)
    
    // Create scales
    const angleScale = d3.scalePoint()
      .domain(categories.map(c => c.id))
      .range([0, Math.PI * 2])
    
    const radiusScale = d3.scaleLinear()
      .domain([0, maxValue])
      .range([0, radius])
    
    // Draw grid circles
    const gridCircles = [0.2, 0.4, 0.6, 0.8, 1]
    gridCircles.forEach(d => {
      svg.append('circle')
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('r', radius * d)
        .attr('fill', 'none')
        .attr('stroke', gridColor)
        .attr('stroke-dasharray', '3,3')
        .attr('stroke-width', 1)
    })
    
    // Draw grid lines
    categories.forEach(cat => {
      const angle = angleScale(cat.id)!
      const lineX = radius * Math.sin(angle)
      const lineY = -radius * Math.cos(angle)
      
      svg.append('line')
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', lineX)
        .attr('y2', lineY)
        .attr('stroke', gridColor)
        .attr('stroke-width', 1)
      
      // Add category labels
      svg.append('text')
        .attr('x', lineX * 1.1)
        .attr('y', lineY * 1.1)
        .attr('text-anchor', () => {
          if (angle === 0 || Math.abs(angle - Math.PI) < 0.01) return 'middle'
          return angle < Math.PI ? 'start' : 'end'
        })
        .attr('dominant-baseline', () => {
          if (Math.abs(angle - Math.PI / 2) < 0.01) return 'hanging'
          if (Math.abs(angle - Math.PI * 3 / 2) < 0.01) return 'text-before-edge'
          return 'middle'
        })
        .attr('fill', textColor)
        .attr('font-size', '12px')
        .text(cat.name)
    })
    
    // Create line generator
    const lineGenerator = d3.lineRadial<[string, number]>()
      .angle(d => angleScale(d[0])!)
      .radius(d => radiusScale(d[1]))
      .curve(d3.curveCardinalClosed.tension(0.5))
    
    // Draw player data
    data.forEach(player => {
      const dataPoints = categories.map(cat => [
        cat.id,
        player.values[cat.id] || 0
      ] as [string, number])
      
      // Draw polygon
      svg.append('path')
        .datum(dataPoints)
        .attr('d', d => lineGenerator(d)!)
        .attr('fill', player.color)
        .attr('fill-opacity', 0.2)
        .attr('stroke', player.color)
        .attr('stroke-width', 2)
      
      // Add data points
      dataPoints.forEach(point => {
        const angle = angleScale(point[0])!
        const r = radiusScale(point[1])
        const x = r * Math.sin(angle)
        const y = -r * Math.cos(angle)
        
        svg.append('circle')
          .attr('cx', x)
          .attr('cy', y)
          .attr('r', 4)
          .attr('fill', player.color)
          .attr('stroke', '#fff')
          .attr('stroke-width', 1)
      })
    })
    
    // Add legend
    const legend = svg.append('g')
      .attr('transform', `translate(${-width/2 + 20}, ${-height/2 + 20})`)
    
    data.forEach((player, i) => {
      const legendGroup = legend.append('g')
        .attr('transform', `translate(0, ${i * 25})`)
      
      legendGroup.append('rect')
        .attr('width', 15)
        .attr('height', 15)
        .attr('fill', player.color)
        .attr('rx', 2)
      
      legendGroup.append('text')
        .attr('x', 25)
        .attr('y', 12.5)
        .attr('fill', textColor)
        .attr('font-size', '14px')
        .attr('alignment-baseline', 'middle')
        .text(player.player)
    })
  }, [data, categories, maxValue, width, height, theme])
  
  return (
    <div className="flex justify-center">
      <svg ref={svgRef}></svg>
    </div>
  )
}

export default PlayerComparisonRadarChart