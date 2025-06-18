import axios from 'axios';
import { Player, PlayerStats } from '@/types/Player';
import { mockPlayers, mockPlayerStats } from './mockData';

const API_BASE_URL = '/api';
const USE_MOCK_DATA = true; // Toggle this to use mock data vs real API calls

// Fetch a player by ID
export const fetchPlayerById = async (playerId: string): Promise<Player> => {
  if (USE_MOCK_DATA) {
    // Return mock data for development
    const player = mockPlayers.find(p => p.id === playerId);
    if (!player) {
      throw new Error('Player not found');
    }
    return player;
  }
  
  try {
    const response = await axios.get(`${API_BASE_URL}/players/${playerId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching player:', error);
    throw error;
  }
};

// Search players by name
export const searchPlayers = async (query: string): Promise<Player[]> => {
  if (USE_MOCK_DATA) {
    // Filter mock data based on query
    return mockPlayers.filter(player => 
      player.name.toLowerCase().includes(query.toLowerCase())
    );
  }
  
  try {
    const response = await axios.get(`${API_BASE_URL}/players/search`, {
      params: { q: query }
    });
    return response.data;
  } catch (error) {
    console.error('Error searching players:', error);
    throw error;
  }
};

// Fetch player statistics
export const fetchPlayerStats = async (playerId: string): Promise<PlayerStats> => {
  if (USE_MOCK_DATA) {
    // Return mock stats data for development
    const stats = mockPlayerStats[playerId];
    if (!stats) {
      throw new Error('Player stats not found');
    }
    return stats;
  }
  
  try {
    const response = await axios.get(`${API_BASE_URL}/players/${playerId}/stats`);
    return response.data;
  } catch (error) {
    console.error('Error fetching player stats:', error);
    throw error;
  }
};

// Compare players
export const comparePlayerStats = async (playerIds: string[]): Promise<Record<string, PlayerStats>> => {
  if (USE_MOCK_DATA) {
    // Return mock comparison data
    const comparisonData: Record<string, PlayerStats> = {};
    playerIds.forEach(id => {
      const stats = mockPlayerStats[id];
      if (stats) {
        comparisonData[id] = stats;
      }
    });
    return comparisonData;
  }
  
  try {
    const response = await axios.post(`${API_BASE_URL}/players/compare`, { playerIds });
    return response.data;
  } catch (error) {
    console.error('Error comparing players:', error);
    throw error;
  }
};