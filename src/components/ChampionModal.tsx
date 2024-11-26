import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Champion, ChampionSpell, ChampionPassive } from '../types/champions';
import { X, ChevronLeft, ChevronRight, Timer, Droplet, Target } from 'lucide-react';
import { fetchChampionDetails } from '../types/champions';
import { championsData } from '../data/championsData';

interface ChampionModalProps {
  champion: Champion;
  onClose: () => void;
}

const parseAbilityDescription = (description: string) => {
  return description.split(/<font color='(#[A-Fa-f0-9]{6})'>/g).map((text, index) => {
    if (index === 0) return text;
    
    const colorEnd = text.indexOf("</font>");
    if (colorEnd === -1) return text;
    
    const color = text.substring(0, 7);
    const content = text.substring(7, colorEnd);
    const rest = text.substring(colorEnd + 7);
    
    return (
      <>
        <span style={{ color }}>{content}</span>
        {rest}
      </>
    );
  });
};

const ChampionModal: React.FC<ChampionModalProps> = ({ champion, onClose }) => {
  const [fullChampionData, setFullChampionData] = useState<Champion | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedAbilityIndex, setSelectedAbilityIndex] = useState(0);
  const [selectedSkin, setSelectedSkin] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    const loadChampionDetails = async () => {
      try {
        const data = await fetchChampionDetails(champion.id);
        setFullChampionData(data);
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

  useEffect(() => {
    if (!fullChampionData || !isAutoPlaying) return;

    const timer = setInterval(() => {
      setSelectedAbilityIndex((prevIndex) => (prevIndex + 1) % (fullChampionData.spells.length + 1));
    }, 5000);

    return () => clearInterval(timer);
  }, [fullChampionData, isAutoPlaying]);

  const handleAbilityClick = useCallback((index: number) => {
    setSelectedAbilityIndex(index);
    setIsAutoPlaying(false);
  }, []);

  const getSelectedAbility = useCallback(() => {
    if (!fullChampionData) return null;
    if (selectedAbilityIndex === 0) {
      return { ability: fullChampionData.passive, key: 'P1', isPassive: true };
    }
    const spell = fullChampionData.spells[selectedAbilityIndex - 1];
    return { 
      ability: spell, 
      key: `${['Q', 'W', 'E', 'R'][selectedAbilityIndex - 1]}1`,
      isPassive: false
    };
  }, [fullChampionData, selectedAbilityIndex]);

  const getAbilityVideoUrl = useCallback((championId: string, abilityKey: string) => {
    const champId = championsData[championId];
    if (!champId) return null;
    return `https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${champId}/ability_${champId}_${abilityKey}.webm`;
  }, []);

  const scrollCarousel = useCallback((direction: 'left' | 'right') => {
    if (!carouselRef.current) return;
    const scrollAmount = carouselRef.current.offsetWidth;
    carouselRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  }, []);

  if (loading || !fullChampionData) {
    return (
      <div className="fixed inset-0 bg-[#010911] z-[9999] flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#C8AA6E] border-t-transparent"></div>
      </div>
    );
  }

  const selectedAbility = getSelectedAbility();

  return (
    <div className="!fixed !inset-0 !m-0 !p-0 !z-[9999] bg-[#010911] overflow-auto">
      <button
        onClick={onClose}
        className="fixed top-6 right-6 z-50 w-8 h-8 flex items-center justify-center 
                 text-[#C8AA6E] hover:text-[#E4C781] transition-colors"
        aria-label="Close modal"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Hero Section */}
      <div className="relative h-screen">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#010911]/60 to-[#010911]"></div>
        <img 
          src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${fullChampionData.id}_${selectedSkin}.jpg`}
          alt={fullChampionData.name}
          className="w-full h-full object-cover"
        />
        
        {/* Champion Info */}
        <div className="absolute top-1/2 left-[10%] transform -translate-y-1/2 max-w-[40%] w-full px-4 md:px-0">
          <h2 className="text-xl sm:text-2xl md:text-3xl text-[#C8AA6E] font-bold italic uppercase mb-2 tracking-wide">{fullChampionData.title}</h2>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold text-white uppercase italic tracking-wide">{fullChampionData.name}</h1>
        </div>

        {/* Champion Lore */}
        <div className="absolute top-1/2 right-[10%] transform -translate-y-1/2 max-w-full md:max-w-[35%] w-full px-4 md:px-0">
          <p className="text-gray-200 leading-relaxed text-sm sm:text-base italic">
            {fullChampionData.lore}
          </p>
        </div>
        
        {/* Skin Selection */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8">
          <div className="max-w-[1400px] mx-auto relative px-4 md:px-0">
            {/* Navigation buttons */}
            {fullChampionData.skins.length > 3 && (
              <button 
                onClick={() => scrollCarousel('left')}
                className="absolute left-0 md:left-[-40px] top-1/2 -translate-y-1/2 w-8 h-8
                          text-[#C8AA6E] hover:text-[#E4C781] transition-colors z-10
                          bg-black/50 md:bg-transparent rounded-full md:rounded-none"
                aria-label="Previous skins"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
            )}
            
            {/* Skin carousel */}
            <div 
              ref={carouselRef}
              className="flex gap-2 sm:gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
            >
              {fullChampionData.skins.map((skin) => (
                <div
                  key={skin.id}
                  className="flex-shrink-0 w-[200px] sm:w-[240px] md:w-[280px]"
                >
                  <button
                    onClick={() => setSelectedSkin(skin.num)}
                    className={`w-full aspect-[16/9] relative overflow-hidden rounded-sm
                              ${selectedSkin === skin.num ? 'ring-2 ring-[#C8AA6E]' : ''}`}
                  >
                    <img
                      src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${fullChampionData.id}_${skin.num}.jpg`}
                      alt={skin.name}
                      className={`w-full h-full object-cover transition-transform duration-300 
                                ${selectedSkin === skin.num ? 'scale-105' : 'hover:scale-105'}`}
                    />
                  </button>
                  <p className="text-center mt-2 text-xs sm:text-sm tracking-wider uppercase text-[#C8AA6E] italic font-bold">
                    {skin.name === 'default' ? `${fullChampionData.name} Original` : skin.name}
                  </p>
                </div>
              ))}
            </div>
            
            {/* Right navigation button */}
            {fullChampionData.skins.length > 3 && (
              <button 
                onClick={() => scrollCarousel('right')}
                className="absolute right-0 md:right-[-40px] top-1/2 -translate-y-1/2 w-8 h-8
                          text-[#C8AA6E] hover:text-[#E4C781] transition-colors z-10
                          bg-black/50 md:bg-transparent rounded-full md:rounded-none"
                aria-label="Next skins"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Champion Info */}
      <div className="bg-[#010911] px-[10%] py-16">
        <div className="space-y-16 max-w-[1400px] mx-auto">
          {/* Abilities */}
          <div>
            <h3 className="text-3xl font-bold italic text-[#C8AA6E] mb-6">Champion <span className="text-white">Abilities</span></h3>
            
            {/* Ability Icons */}
            <div className="flex flex-wrap gap-4 mb-8">
              {/* Passive */}
              <button
                onClick={() => handleAbilityClick(0)}
                className={`relative w-20 h-20 rounded-sm transition-all duration-200 overflow-hidden
                          ${selectedAbilityIndex === 0 ? 'ring-2 ring-[#C8AA6E]' : 'hover:ring-2 hover:ring-[#C8AA6E]/50'}`}
                aria-label={`Select ${fullChampionData.passive.name} (Passive)`}
              >
                <img 
                  src={`https://ddragon.leagueoflegends.com/cdn/14.23.1/img/passive/${fullChampionData.passive.image.full}`}
                  alt={fullChampionData.passive.name}
                  className="w-full h-full"
                />
                <span className="absolute bottom-1 left-1 bg-black/80 px-2 py-0.5 text-sm text-[#C8AA6E] italic font-bold">P</span>
              </button>

              {/* Active Abilities */}
              {fullChampionData.spells.map((spell, index) => (
                <button
                  key={spell.id}
                  onClick={() => handleAbilityClick(index + 1)}
                  className={`relative w-20 h-20 rounded-sm transition-all duration-200 overflow-hidden
                            ${selectedAbilityIndex === index + 1 ? 'ring-2 ring-[#C8AA6E]' : 'hover:ring-2 hover:ring-[#C8AA6E]/50'}`}
                  aria-label={`Select ${spell.name} (${['Q', 'W', 'E', 'R'][index]})`}
                >
                  <img 
                    src={`https://ddragon.leagueoflegends.com/cdn/14.23.1/img/spell/${spell.image.full}`}
                    alt={spell.name}
                    className="w-full h-full"
                  />
                  <span className="absolute bottom-1 left-1 bg-black/80 px-2 py-0.5 text-sm text-[#C8AA6E] italic font-bold">
                    {['Q', 'W', 'E', 'R'][index]}
                  </span>
                </button>
              ))}
            </div>

            {/* Ability Preview */}
            {selectedAbility && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="aspect-video rounded-sm overflow-hidden bg-[#010911]">
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
                    Your browser does not support the video tag.
                  </video>
                </div>
                <div className="w-fit">
                  <h4 className="text-2xl italic font-bold text-[#C8AA6E] mb-4">
                    {selectedAbility.ability.name}
                  </h4>
                  <div className="space-y-4">
                    <p className="text-gray-300 text-base leading-relaxed">
                      {parseAbilityDescription(selectedAbility.ability.description)}
                    </p>
                    {!selectedAbility.isPassive && 'cooldownBurn' in selectedAbility.ability && (
                      <div className="flex flex-wrap gap-6 text-base border-t border-[#C8AA6E]/20 pt-4">
                        <span className="flex items-center gap-2 text-[#B4E3FF]">
                          <Droplet className="w-4 h-4 text-white" />
                          <strong className="text-[#C8AA6E] italic font-bold">Cost:</strong> {selectedAbility.ability.costBurn}
                        </span>
                        <span className="flex items-center gap-2 text-[#FFE4B4]">
                          <Timer className="w-4 h-4 text-white" />
                          <strong className="text-[#C8AA6E] italic font-bold">Cooldown:</strong> {selectedAbility.ability.cooldownBurn}s
                        </span>
                        {selectedAbility.ability.rangeBurn !== "self" && (
                          <span className="flex items-center gap-2 text-[#B4FFB4]">
                            <Target className="w-4 h-4 text-white" />
                            <strong className="text-[#C8AA6E] italic font-bold">Range:</strong> {selectedAbility.ability.rangeBurn}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Page End Divider */}
        <div className="max-w-[1400px] mx-auto mt-16">
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        </div>
      </div>

      <style jsx global>{`
        ::-webkit-scrollbar {
          width: 0.1px;
          height: 0.1px;
        }

        ::-webkit-scrollbar-track {
          background: transparent;
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
        }

        * {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        *::-webkit-scrollbar {
          width: 0.1px;
          height: 0.1px;
        }

        *::-webkit-scrollbar-track {
          background: transparent;
        }

        *::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
        }

        .champion-lore {
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
        }
      `}</style>
    </div>
  );
};

export default ChampionModal;

