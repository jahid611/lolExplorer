// MatchStats.tsx
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Sword, Target, Coins } from 'lucide-react';
import MatchDetails from './MatchDetails';


ChartJS.register(ArcElement, Tooltip, Legend);

interface MatchStatsProps {
  matches: any[];
  puuid: string;
}

const MatchStats: React.FC<MatchStatsProps> = ({ matches, puuid }) => {
  const getPlayerStats = () => {
    let wins = 0;
    let totalKills = 0;
    let totalDeaths = 0;
    let totalAssists = 0;
    let totalCS = 0;
    let totalGold = 0;
    let championsPlayed = new Set();

    matches.forEach((match) => {
      const player = match.info.participants.find((p: any) => p.puuid === puuid);
      if (player) {
        if (player.win) wins++;
        totalKills += player.kills;
        totalDeaths += player.deaths;
        totalAssists += player.assists;
        totalCS += player.totalMinionsKilled + player.neutralMinionsKilled;
        totalGold += player.goldEarned;
        championsPlayed.add(player.championId);
      }
    });

    const games = matches.length;
    return {
      winRate: ((wins / games) * 100).toFixed(1),
      avgKDA: ((totalKills + totalAssists) / Math.max(totalDeaths, 1)).toFixed(2),
      avgCS: (totalCS / games).toFixed(1),
      avgGold: (totalGold / games / 1000).toFixed(1),
      totalKills,
      totalDeaths,
      totalAssists,
      championsPlayed: Array.from(championsPlayed),
      chartData: {
        labels: ['Victoires', 'Défaites'],
        datasets: [
          {
            data: [wins, games - wins],
            backgroundColor: ['rgba(66, 156, 227, 0.8)', 'rgba(234, 76, 137, 0.8)'],
            borderColor: ['rgb(66, 156, 227)', 'rgb(234, 76, 137)'],
            borderWidth: 1,
          },
        ],
      },
    };
  };

  const stats = getPlayerStats();

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Win Rate Chart */}
        <div className="bg-[#091428]/90 rounded-lg p-6 border border-[#1E2328] flex flex-col items-center">
          <h3 className="text-[#C89B3C] font-bold text-lg mb-6 w-full">Win Rate</h3>
          <div className="aspect-square w-full max-w-[300px] relative">
            <Doughnut
              data={stats.chartData}
              options={{
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                  legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                      color: '#C89B3C',
                      font: {
                        size: 12,
                        weight: 'bold',
                      },
                      padding: 20,
                    },
                  },
                  tooltip: {
                    backgroundColor: '#091428',
                    titleColor: '#C89B3C',
                    bodyColor: '#ffffff',
                    borderColor: '#1E2328',
                    borderWidth: 1,
                    padding: 12,
                    displayColors: true,
                  },
                },
                cutout: '70%',
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <span className="text-3xl font-bold text-[#C89B3C]">{stats.winRate}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* KDA Stats */}
        <div className="bg-[#091428]/90 rounded-lg p-6 border border-[#1E2328]">
          <h3 className="text-[#C89B3C] font-bold text-lg mb-6">Performance</h3>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/10 rounded-lg">
                <Sword className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <div className="text-sm text-gray-400">KDA Ratio</div>
                <div className="text-xl font-bold text-white">
                  {stats.totalKills}/{stats.totalDeaths}/{stats.totalAssists}
                  <span className="text-[#C89B3C] ml-2">({stats.avgKDA})</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-500/10 rounded-lg">
                <Target className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <div className="text-sm text-gray-400">CS par partie</div>
                <div className="text-xl font-bold text-white">{stats.avgCS}</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-500/10 rounded-lg">
                <Coins className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Or par partie</div>
                <div className="text-xl font-bold text-white">{stats.avgGold}k</div>
              </div>
            </div>
          </div>
        </div>

        {/* Champions Played */}
        <div className="bg-[#091428]/90 rounded-lg p-6 border border-[#1E2328]">
          <h3 className="text-[#C89B3C] font-bold text-lg mb-6">Champions Joués</h3>
          <div className="grid grid-cols-3 gap-2">
            {stats.championsPlayed.slice(0, 9).map((championId) => (
              <div key={championId} className="relative group aspect-square">
                <img
                  src={`https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/${championId}.png`}
                  alt={`Champion ${championId}`}
                  className="w-full h-full object-cover rounded-lg border border-[#1E2328] transition-transform transform hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                  <span className="text-xs text-white font-bold">{championId}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchStats;
