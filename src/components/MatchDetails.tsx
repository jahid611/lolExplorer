import React from 'react';

interface Participant {
  summonerName: string;
  championId: number;
  kills: number;
  deaths: number;
  assists: number;
  totalMinionsKilled: number;
  neutralMinionsKilled: number;
  items: number[];
  summoner1Id: number;
  summoner2Id: number;
  win: boolean;
}

interface MatchDetailsProps {
  participants: Participant[];
}

const MatchDetails: React.FC<MatchDetailsProps> = ({ participants }) => {
  const getChampionImage = (championId: number) =>
    `https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/${championId}.png`;

  const getSummonerSpellImage = (spellId: number) =>
    `https://ddragon.leagueoflegends.com/cdn/14.23.1/img/spell/Summoner${spellId}.png`;

  const blueTeam = participants.slice(0, 5);
  const redTeam = participants.slice(5, 10);

  const renderTeam = (team: Participant[]) => (
    <div className="grid grid-cols-1 gap-2">
      {team.map((player, index) => (
        <div 
          key={index} 
          className={`${
            player.win ? 'bg-[#28423B]' : 'bg-[#43262B]'
          } rounded-lg p-4 flex items-center gap-4`}
        >
          <div className="flex items-center gap-3">
            <img
              src={getChampionImage(player.championId)}
              alt="Champion"
              className="w-12 h-12 rounded"
            />
            <div className="flex flex-col">
              <span className="text-[#F0E6D2] text-sm">{player.summonerName}</span>
              <div className="flex gap-1 mt-1">
                <img
                  src={getSummonerSpellImage(player.summoner1Id)}
                  alt="Summoner 1"
                  className="w-4 h-4"
                />
                <img
                  src={getSummonerSpellImage(player.summoner2Id)}
                  alt="Summoner 2"
                  className="w-4 h-4"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-auto">
            <span className="text-[#F0E6D2] text-sm">
              {player.kills}/{player.deaths}/{player.assists}
            </span>
            <span className="text-[#C89B3C] text-xs">
              {player.totalMinionsKilled + player.neutralMinionsKilled} CS
            </span>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-[#091428] p-4 rounded-lg">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-[#0ACF83] text-sm font-medium mb-2">Blue Team</h3>
          {renderTeam(blueTeam)}
        </div>
        <div>
          <h3 className="text-[#FF4E50] text-sm font-medium mb-2">Red Team</h3>
          {renderTeam(redTeam)}
        </div>
      </div>
    </div>
  );
};

export default MatchDetails;

