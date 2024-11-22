import React, { useEffect, useState } from 'react';
import { Champion, ChampionSpell, ChampionPassive } from '../types/champions';
import { X } from 'lucide-react';
import { fetchChampionDetails } from '../api/champions';
import { championsData } from '../data/championsData';

interface ChampionModalProps {
  champion: Champion;
  onClose: () => void;
}

const ChampionModal: React.FC<ChampionModalProps> = ({ champion, onClose }) => {
  const [fullChampionData, setFullChampionData] = useState<Champion | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedAbility, setSelectedAbility] = useState<{
    ability: ChampionSpell | ChampionPassive;
    key: string;
    isPassive: boolean;
  } | null>(null);
  const [selectedSkin, setSelectedSkin] = useState<number>(0);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    const loadChampionDetails = async () => {
      try {
        const data = await fetchChampionDetails(champion.id);
        setFullChampionData(data);
        setSelectedAbility({
          ability: data.passive,
          key: 'P1',
          isPassive: true
        });
      } catch (error) {
        console.error('Failed to load champion details:', error);
      } finally {
        setLoading(false);
      }
    };

    loadChampionDetails();

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [champion.id]);

  const handleAbilityClick = (ability: ChampionSpell | ChampionPassive, index: number) => {
    const isPassive = 'image' in ability && !('cooldown' in ability);
    const abilityKey = isPassive ? 'P1' : `${['Q', 'W', 'E', 'R'][index]}1`;
    
    setSelectedAbility({
      ability,
      key: abilityKey,
      isPassive
    });
  };

  const getAbilityVideoUrl = (championId: string, abilityKey: string) => {
    const champId = championsData[championId];
    if (!champId) return null;
    return `https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${champId}/ability_${champId}_${abilityKey}.webm`;
  };

  if (loading || !fullChampionData) {
    return (
      <div className="fixed inset-0 bg-gray-900 z-[9999] flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#C8AA6E] border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="!fixed !top-0 !left-0 !right-0 !bottom-0 !m-0 !p-0 !z-[9999]">
      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          overflow: hidden;
        }
        @font-face {
          font-family: 'BeaufortForLoL';
          src: url('/fonts/BeaufortforLOL-Regular.ttf') format('truetype');
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }
        @font-face {
          font-family: 'BeaufortForLoL';
          src: url('/fonts/BeaufortforLOL-Bold.ttf') format('truetype');
          font-weight: bold;
          font-style: normal;
          font-display: swap;
        }
        .font-beaufort {
          font-family: 'BeaufortForLoL', sans-serif;
        }
        #__next {
          position: relative;
        }
      `}</style>
      <div className="!fixed !inset-0 !m-0 !p-0 bg-gray-900 !z-[9999] overflow-y-auto font-sans">
        {/* Rest of the modal content remains exactly the same */}
        <button
          onClick={onClose}
          className="fixed top-8 right-8 w-12 h-12 rounded-full bg-black/50 border-2 border-[#C8AA6E]
                   text-[#C8AA6E] flex items-center justify-center transition-all duration-200
                   hover:bg-[#C8AA6E] hover:text-black hover:rotate-90 z-50"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Skins Preview */}
        <div className="relative h-screen">
          <img 
            src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${fullChampionData.id}_${selectedSkin}.jpg`}
            alt={fullChampionData.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-gray-900"></div>
          
          {/* Skin Selection */}
          <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-gray-900">
            <div className="max-w-7xl mx-auto">
              <h3 className="text-2xl font-bold text-[#C8AA6E] mb-4 font-beaufort">Available <span className="text-white">Skins</span></h3>
              <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
                {fullChampionData.skins.map((skin) => (
                  <button
                    key={skin.id}
                    onClick={() => setSelectedSkin(skin.num)}
                    className={`flex-shrink-0 snap-start w-48 group relative
                              ${selectedSkin === skin.num ? 'ring-2 ring-[#C8AA6E] ring-offset-2 ring-offset-gray-900' : ''}`}
                  >
                    <div className="relative aspect-[2/3] overflow-hidden rounded-lg">
                      <img
                        src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${fullChampionData.id}_${skin.num}.jpg`}
                        alt={skin.name}
                        className={`w-full h-full object-cover transition-transform duration-300 
                                  ${selectedSkin === skin.num ? 'scale-105' : 'group-hover:scale-105'}`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-3 text-center">
                        <p className="text-sm font-medium text-white font-beaufort">
                          {skin.name === 'default' ? 'Classic' : skin.name}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Champion Name */}
          <div className="absolute top-1/2 left-[10%] transform -translate-y-1/2">
            <h2 className="text-3xl text-[#C8AA6E] font-bold uppercase mb-2 font-beaufort">{fullChampionData.title}</h2>
            <h1 className="text-8xl font-bold text-white uppercase font-beaufort">{fullChampionData.name}</h1>
          </div>
        </div>

        {/* Champion Info */}
        <div className="bg-gray-900 px-[10%] py-16">
          <div className="space-y-16">
            {/* Abilities */}
            <div>
              <h3 className="text-3xl font-bold text-[#C8AA6E] mb-6 font-beaufort"><span className="text-white">Champion</span> Abilities</h3>
              
              {/* Ability Icons */}
              <div className="flex gap-4 mb-8">
                {/* Passive */}
                <button
                  onClick={() => handleAbilityClick(fullChampionData.passive, -1)}
                  className={`relative w-20 h-20 rounded border-2 transition-all duration-200
                            ${selectedAbility?.isPassive 
                              ? 'border-[#C8AA6E] shadow-lg shadow-[#C8AA6E]/20' 
                              : 'border-gray-700 hover:border-[#C8AA6E]/50'}`}
                >
                  <img 
                    src={`https://ddragon.leagueoflegends.com/cdn/14.23.1/img/passive/${fullChampionData.passive.image.full}`}
                    alt={fullChampionData.passive.name}
                    className="w-full h-full rounded"
                  />
                  <span className="absolute bottom-1 left-1 bg-black/80 px-2 py-0.5 rounded text-sm text-[#C8AA6E] font-beaufort">P</span>
                </button>

                {/* Active Abilities */}
                {fullChampionData.spells.map((spell, index) => (
                  <button
                    key={spell.id}
                    onClick={() => handleAbilityClick(spell, index)}
                    className={`relative w-20 h-20 rounded border-2 transition-all duration-200
                              ${selectedAbility?.ability === spell
                                ? 'border-[#C8AA6E] shadow-lg shadow-[#C8AA6E]/20' 
                                : 'border-gray-700 hover:border-[#C8AA6E]/50'}`}
                  >
                    <img 
                      src={`https://ddragon.leagueoflegends.com/cdn/14.23.1/img/spell/${spell.image.full}`}
                      alt={spell.name}
                      className="w-full h-full rounded"
                    />
                    <span className="absolute bottom-1 left-1 bg-black/80 px-2 py-0.5 rounded text-sm text-[#C8AA6E] font-beaufort">
                      {['Q', 'W', 'E', 'R'][index]}
                    </span>
                  </button>
                ))}
              </div>

              {/* Ability Preview */}
              {selectedAbility && (
                <div className="grid grid-cols-2 gap-8 bg-gray-800/50 rounded-lg overflow-hidden">
                  <div className="aspect-video">
                    <video
                      key={selectedAbility.key}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    >
                      <source 
                        src={getAbilityVideoUrl(fullChampionData.id, selectedAbility.key)} 
                        type="video/mp4" 
                      />
                    </video>
                  </div>
                  <div className="p-6">
                    <h4 className="text-2xl font-bold text-[#C8AA6E] mb-4 font-beaufort">
                      {selectedAbility.ability.name}
                    </h4>
                    <p className="text-gray-300 mb-4 text-lg leading-relaxed">
                      {selectedAbility.ability.description}
                    </p>
                    {!selectedAbility.isPassive && 'cooldownBurn' in selectedAbility.ability && (
                      <div className="flex gap-6 text-base">
                        <span className="text-blue-400">
                          <strong className="text-[#C8AA6E] font-beaufort">Cost:</strong> {selectedAbility.ability.costBurn}
                        </span>
                        <span className="text-yellow-400">
                          <strong className="text-[#C8AA6E] font-beaufort">Cooldown:</strong> {selectedAbility.ability.cooldownBurn}s
                        </span>
                        {selectedAbility.ability.rangeBurn !== "self" && (
                          <span className="text-green-400">
                            <strong className="text-[#C8AA6E] font-beaufort">Range:</strong> {selectedAbility.ability.rangeBurn}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Lore */}
            <div>
              <h3 className="text-3xl font-bold text-[#C8AA6E] mb-6 font-beaufort">Champion <span className="text-white">Lore</span></h3>
              <div className="bg-gray-800/50 rounded-lg p-6">
                <p className="text-gray-300 leading-relaxed text-lg">{fullChampionData.lore}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChampionModal;

