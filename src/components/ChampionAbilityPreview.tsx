import React from 'react';
import { ChampionSpell, ChampionPassive } from '../types/champions';

interface ChampionAbilityPreviewProps {
  ability: ChampionSpell | ChampionPassive;
  championId: string;
  abilityKey: string;
  isPassive?: boolean;
}

const ChampionAbilityPreview: React.FC<ChampionAbilityPreviewProps> = ({
  ability,
  championId,
  abilityKey,
  isPassive = false
}) => {
  // Construire l'URL de la vidéo en fonction du championId et de la clé de capacité
  const videoUrl = `https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${championId}/ability_${championId}_${abilityKey}.webm`;

  return (
    <div className="ability-preview bg-gray-800/50 rounded-lg overflow-hidden">
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
      <div className="p-4">
        <h4 className="text-lg font-bold text-yellow-500">{ability.name}</h4>
        <p className="text-gray-300 mt-2">{ability.description}</p>
        {!isPassive && 'cooldownBurn' in ability && (
          <div className="flex gap-4 mt-3 text-sm">
            <span className="text-blue-400">Cost: {ability.costBurn}</span>
            <span className="text-yellow-400">Cooldown: {ability.cooldownBurn}s</span>
            {ability.rangeBurn !== "self" && (
              <span className="text-green-400">Range: {ability.rangeBurn}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChampionAbilityPreview;