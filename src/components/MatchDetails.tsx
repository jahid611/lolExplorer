import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Match, Participant } from '../types/player';
import { 
  getChampionIconUrl, 
  getItemIconUrl, 
  fetchSummonerSpells,
  fetchRunes
} from '../utils/dataDragon';
import { ChampionTooltip } from './ChampionTooltip';
import { ItemTooltip } from './ItemTooltip';
import { MatchObjectives } from './MatchObjectives';

interface MatchDetailsProps {
  match: Match;
  participant: Participant;
  onChampionClick: (championName: string) => void;
}

export default function MatchDetails({ match, participant, onChampionClick }: MatchDetailsProps) {
  const [tooltip, setTooltip] = useState<{
    content: React.ReactNode;
    position: { x: number; y: number };
  } | null>(null);
  const [summonerSpells, setSummonerSpells] = useState<Record<string, any>>({});
  const [runes, setRunes] = useState<Record<number, any>>({});
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const loadData = async () => {
      try {
        const [spellsData, runesData] = await Promise.all([
          fetchSummonerSpells(),
          fetchRunes()
        ]);
        setSummonerSpells(spellsData);
        setRunes(runesData);
      } catch (error) {
        console.error('Error loading summoner spells or runes:', error);
      }
    };
    loadData();
  }, []);

  const team1 = match.info.participants.slice(0, 5);
  const team2 = match.info.participants.slice(5);

  const handleMouseEnter = (content: React.ReactNode, event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltip({
      content,
      position: { 
        x: rect.right + 10,
        y: rect.top
      }
    });
  };

  const handleMouseLeave = () => {
    setTooltip(null);
  };

  const handleImageError = (key: string) => {
    setImageErrors(prev => ({ ...prev, [key]: true }));
  };

  const getSummonerSpellUrl = (spellId: number) => {
    const spell = Object.values(summonerSpells).find(s => s.key === spellId.toString());
    if (spell) {
      return `https://ddragon.leagueoflegends.com/cdn/14.23.1/img/spell/${spell.id}.png`;
    }
    return `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/data/spells/icons2d/summoner-${spellId}.png`;
  };

  const getRuneUrl = (runeId: number) => {
    const rune = runes[runeId];
    if (rune) {
      return `https://ddragon.leagueoflegends.com/cdn/img/${rune.icon}`;
    }
    return `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/${runeId}.png`;
  };

  const calculateScoreOP = (player: Participant) => {
    const kda = (player.kills + player.assists) / Math.max(1, player.deaths);
    const csPerMin = ((player.totalMinionsKilled || 0) + (player.neutralMinionsKilled || 0)) / (match.info.gameDuration / 60);
    const damageScore = player.totalDamageDealtToChampions ? player.totalDamageDealtToChampions / 1000 : 0;
    
    return ((kda * 3) + (csPerMin * 2) + damageScore / 2).toFixed(1);
  };

  const getStatTooltip = (stat: string) => {
    switch (stat) {
      case 'kda':
        return "KDA (Kills/Deaths/Assists) - Ratio of (Kills + Assists) to Deaths";
      case 'cs':
        return "CS (Creep Score) - Total minions and monsters killed";
      case 'damage':
        return "Total damage dealt to champions";
      case 'taken':
        return "Total damage taken from champions";
      case 'vision':
        return "Vision score - Contribution to team vision control";
      default:
        return "";
    }
  };

  const renderPlayerRow = (player: Participant) => {
    const kda = ((player.kills + player.assists) / Math.max(player.deaths, 1)).toFixed(2);
    const csPerMin = ((player.totalMinionsKilled || 0) + (player.neutralMinionsKilled || 0)) / (match.info.gameDuration / 60);
    const scoreOP = calculateScoreOP(player);
    
    return (
      <div key={player.puuid} className="flex items-center gap-1 py-0.5 px-1 hover:bg-black/20 transition-colors">
        {/* Champion + Spells + Runes */}
        <div className="flex items-center gap-1 w-[140px]">
          <div className="relative flex items-center gap-1">
            <div 
              className="relative cursor-pointer"
              onMouseEnter={(e) => handleMouseEnter(<ChampionTooltip championName={player.championName} />, e)}
              onMouseLeave={handleMouseLeave}
              onClick={() => onChampionClick(player.championName)}
            >
              <img
                src={getChampionIconUrl(player.championName)}
                alt={player.championName}
                className="w-8 h-8 rounded-full transition-colors"
                loading="lazy"
                onError={() => handleImageError(`champion-${player.championName}`)}
              />
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="flex gap-0.5">
                <img
                  src={getSummonerSpellUrl(player.summoner1Id)}
                  alt="Summoner 1"
                  className="w-3 h-3 rounded-sm bg-[#1E2328]"
                  onError={() => handleImageError(`spell-${player.summoner1Id}`)}
                />
                <img
                  src={getSummonerSpellUrl(player.summoner2Id)}
                  alt="Summoner 2"
                  className="w-3 h-3 rounded-sm bg-[#1E2328]"
                  onError={() => handleImageError(`spell-${player.summoner2Id}`)}
                />
              </div>
              <div className="flex gap-0.5">
                {player.perks?.styles.slice(0, 2).map((style, idx) => (
                  <img
                    key={idx}
                    src={getRuneUrl(style.style)}
                    alt={`Rune ${idx + 1}`}
                    className="w-3 h-3 bg-[#1E2328]"
                    onError={() => handleImageError(`rune-${style.style}`)}
                  />
                ))}
              </div>
            </div>
          </div>
          
          {/* Player Name */}
          <div className="flex flex-col min-w-0">
            <Link 
              to={`/player/${player.summonerName}`}
              className="text-[#F0E6D2] text-[10px] font-medium truncate hover:text-[#C89B3C] transition-colors"
            >
              {player.summonerName}
            </Link>
            <span className="text-[#A09B8C] text-[8px]">{player.championName}</span>
          </div>
        </div>

        {/* Score OP */}
        <div className="w-[50px] text-center">
          <span className="text-[#C89B3C] text-[10px] font-medium">{scoreOP}</span>
          <span className="text-[#A09B8C] text-[8px] block">Score</span>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-2">
          <div className="w-[60px]"
               onMouseEnter={(e) => handleMouseEnter(getStatTooltip('kda'), e)}
               onMouseLeave={handleMouseLeave}>
            <span className="text-[#F0E6D2] text-[10px]">{player.kills}/{player.deaths}/{player.assists}</span>
            <span className="text-[#A09B8C] text-[8px] ml-0.5">({kda})</span>
          </div>
          <div className="w-[70px]"
               onMouseEnter={(e) => handleMouseEnter(getStatTooltip('cs'), e)}
               onMouseLeave={handleMouseLeave}>
            <span className="text-[#F0E6D2] text-[10px]">{(player.totalMinionsKilled || 0) + (player.neutralMinionsKilled || 0)}</span>
            <span className="text-[#A09B8C] text-[8px] ml-0.5">
              ({csPerMin.toFixed(1)}/min)
            </span>
          </div>
          <div className="w-[80px]"
               onMouseEnter={(e) => handleMouseEnter(getStatTooltip('damage'), e)}
               onMouseLeave={handleMouseLeave}>
            <span className="text-[#F0E6D2] text-[10px]">{player.totalDamageDealtToChampions?.toLocaleString()}</span>
            <span className="text-[#A09B8C] text-[8px] ml-0.5">dmg</span>
          </div>
          <div className="w-[80px]"
               onMouseEnter={(e) => handleMouseEnter(getStatTooltip('taken'), e)}
               onMouseLeave={handleMouseLeave}>
            <span className="text-[#F0E6D2] text-[10px]">{player.totalDamageTaken?.toLocaleString()}</span>
            <span className="text-[#A09B8C] text-[8px] ml-0.5">taken</span>
          </div>
          <div className="w-[50px]"
               onMouseEnter={(e) => handleMouseEnter(getStatTooltip('vision'), e)}
               onMouseLeave={handleMouseLeave}>
            <span className="text-[#F0E6D2] text-[10px]">{player.visionScore || 0}</span>
            <span className="text-[#A09B8C] text-[8px] ml-0.5">vision</span>
          </div>
        </div>

        {/* Items */}
        <div className="flex gap-0.5 ml-auto">
          {[
            player.item0,
            player.item1,
            player.item2,
            player.item3,
            player.item4,
            player.item5,
            player.item6
          ].map((itemId, idx) => (
            itemId ? (
              <div 
                key={idx}
                onMouseEnter={(e) => handleMouseEnter(<ItemTooltip itemId={itemId} />, e)}
                onMouseLeave={handleMouseLeave}
                className="w-5 h-5 bg-[#1E2328] rounded-sm overflow-hidden flex items-center justify-center"
              >
                <img
                  src={getItemIconUrl(itemId)}
                  alt={`Item ${idx + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={() => handleImageError(`item-${itemId}`)}
                />
              </div>
            ) : (
              <div key={idx} className="w-5 h-5 bg-[#1E2328] rounded-sm" />
            )
          ))}
        </div>
      </div>
    );
  };

  // Calculate team objectives
  const team1Objectives = {
    dragons: match.info.teams[0].objectives.dragon.kills,
    barons: match.info.teams[0].objectives.baron.kills,
    towers: match.info.teams[0].objectives.tower.kills,
    inhibitors: match.info.teams[0].objectives.inhibitor.kills,
    heralds: match.info.teams[0].objectives.riftHerald.kills,
    voidgrubs: match.info.teams[0].objectives.voidgrub?.kills || 0,
    kills: match.info.teams[0].objectives.champion.kills,
    gold: team1.reduce((sum, p) => sum + p.goldEarned, 0),
  }

  const team2Objectives = {
    dragons: match.info.teams[1].objectives.dragon.kills,
    barons: match.info.teams[1].objectives.baron.kills,
    towers: match.info.teams[1].objectives.tower.kills,
    inhibitors: match.info.teams[1].objectives.inhibitor.kills,
    heralds: match.info.teams[1].objectives.riftHerald.kills,
    voidgrubs: match.info.teams[1].objectives.voidgrub?.kills || 0,
    kills: match.info.teams[1].objectives.champion.kills,
    gold: team2.reduce((sum, p) => sum + p.goldEarned, 0),
  }

  return (
    <div className="space-y-1 overflow-x-auto">
      {/* Team 1 */}
      <div className={`overflow-hidden ${team1[0].win ? 'bg-[#28344E]' : 'bg-[#59343B]'}`}>
        {/* Status first */}
        <div className="p-0.5 bg-black/20">
          <h3 className={`text-[10px] font-semibold ${team1[0].win ? 'text-[#08D6F6]' : 'text-[#E84057]'}`}>
            {team1[0].win ? 'Victoire' : 'Défaite'} (Équipe bleue)
          </h3>
        </div>
        {/* Column Headers second */}
        <div className="flex items-center gap-1 py-1 px-1 text-[#8593A5] text-[10px] font-medium bg-[#31313C]">
          <div className="w-[140px]">Champion</div>
          <div className="w-[50px] text-center">Score OP</div>
          <div className="flex items-center gap-2">
            <div className="w-[60px]">KDA</div>
            <div className="w-[70px]">CS</div>
            <div className="w-[80px]">Damage</div>
            <div className="w-[80px]">Taken</div>
            <div className="w-[50px]">Vision</div>
          </div>
          <div className="ml-auto">Items</div>
        </div>
        <div>
          {team1.map(renderPlayerRow)}
        </div>
      </div>

      {/* Match Objectives */}
      <MatchObjectives 
        team1={team1Objectives}
        team2={team2Objectives}
      />

      {/* Team 2 */}
      <div className={`overflow-hidden ${team2[0].win ? 'bg-[#28344E]' : 'bg-[#59343B]'}`}>
        {/* Status first */}
        <div className="p-0.5 bg-black/20">
          <h3 className={`text-[10px] font-semibold ${team2[0].win ? 'text-[#08D6F6]' : 'text-[#E84057]'}`}>
            {team2[0].win ? 'Victoire' : 'Défaite'} (Équipe rouge)
          </h3>
        </div>
        {/* Column Headers second */}
        <div className="flex items-center gap-1 py-1 px-1 text-[#8593A5] text-[10px] font-medium bg-[#31313C]">
          <div className="w-[140px]">Champion</div>
          <div className="w-[50px] text-center">Score OP</div>
          <div className="flex items-center gap-2">
            <div className="w-[60px]">KDA</div>
            <div className="w-[70px]">CS</div>
            <div className="w-[80px]">Damage</div>
            <div className="w-[80px]">Taken</div>
            <div className="w-[50px]">Vision</div>
          </div>
          <div className="ml-auto">Items</div>
        </div>
        <div>
          {team2.map(renderPlayerRow)}
        </div>
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="fixed z-50 bg-[#010A13]/95 p-2 shadow-lg pointer-events-none rounded max-w-[200px] text-xs"
          style={{
            top: tooltip.position.y,
            left: tooltip.position.x,
          }}
        >
          {tooltip.content}
        </div>
      )}
    </div>
  );
}

