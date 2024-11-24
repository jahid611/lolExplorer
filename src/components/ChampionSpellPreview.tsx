import React from 'react';

interface ChampionSpellPreviewProps {
  ability: any;
  championId: string;
  abilityKey: string;
  isPassive?: boolean;
}

const ChampionSpellPreview: React.FC<ChampionSpellPreviewProps> = ({
  ability,
  championId,
  abilityKey,
  isPassive = false
}) => {
  const videoUrl = `https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${championId.toLowerCase()}/ability_${championId.toLowerCase()}_${abilityKey}1.webm`;

  return (
    <div className="ability-preview bg-[#010A13]/80 rounded-lg overflow-hidden mt-2">
      <div className="aspect-video">
        <video
          key={videoUrl}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={videoUrl} type="video/webm" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="p-2">
        <h4 className="text-sm font-bold text-[#F0B232]">{ability.name}</h4>
        <p className="text-[10px] text-[#A09B8C] mt-1">{ability.description}</p>
        {!isPassive && (
          <div className="flex gap-2 mt-1 text-[9px]">
            <span className="text-blue-400">Cost: {ability.costBurn}</span>
            <span className="text-yellow-400">CD: {ability.cooldownBurn}s</span>
            {ability.rangeBurn !== "self" && (
              <span className="text-green-400">Range: {ability.rangeBurn}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChampionSpellPreview;

