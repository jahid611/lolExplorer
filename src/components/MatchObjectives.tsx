

interface ObjectivesProps {
  team1: {
    dragons: number
    barons: number
    towers: number
    inhibitors: number
    heralds: number
    voidgrubs: number
    kills: number
    gold: number
  }
  team2: {
    dragons: number
    barons: number
    towers: number
    inhibitors: number
    heralds: number
    voidgrubs: number
    kills: number
    gold: number
  }
}

export function MatchObjectives({ team1, team2 }: ObjectivesProps) {
  return (
    <div className="py-4 space-y-4 bg-[#31313C]">
      {/* Objectives */}
      <div className="flex justify-between items-start px-4">
        {/* Team 1 Objectives (Left) */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-1">
          <div className="flex items-center gap-1">
            <span className="text-[#08D6F6] text-xs font-medium">{team1.dragons}</span>
            <img 
              src="/objectives/dragon.png" 
              alt="Dragons" 
              className="w-4 h-4"
            />
          </div>
          <div className="flex items-center gap-1">
            <span className="text-[#08D6F6] text-xs font-medium">{team1.barons}</span>
            <img 
              src="/objectives/baron.png" 
              alt="Barons" 
              className="w-4 h-4"
            />
          </div>
          <div className="flex items-center gap-1">
            <span className="text-[#08D6F6] text-xs font-medium">{team1.towers}</span>
            <img 
              src="/objectives/tower.png" 
              alt="Towers" 
              className="w-4 h-4"
            />
          </div>
          <div className="flex items-center gap-1">
            <span className="text-[#08D6F6] text-xs font-medium">{team1.inhibitors}</span>
            <img 
              src="/objectives/inhibitor.png" 
              alt="Inhibitors" 
              className="w-4 h-4"
            />
          </div>
          <div className="flex items-center gap-1">
            <span className="text-[#08D6F6] text-xs font-medium">{team1.heralds}</span>
            <img 
              src="/objectives/herald.png" 
              alt="Heralds" 
              className="w-4 h-4"
            />
          </div>
          <div className="flex items-center gap-1">
            <span className="text-[#08D6F6] text-xs font-medium">{team1.voidgrubs}</span>
            <img 
              src="/objectives/voidgrub.png" 
              alt="Voidgrubs" 
              className="w-4 h-4"
            />
          </div>
        </div>

        {/* Stats in the middle */}
        <div className="flex-1 max-w-[400px] mx-4 space-y-1 mt-2">
          {/* Kills Bar */}
          <div className="relative h-[14px] bg-[#E84057] overflow-hidden">
            <div 
              className="absolute inset-y-0 left-0 bg-[#4171D6]" 
              style={{ 
                width: `${(team1.kills / (team1.kills + team2.kills)) * 100}%` 
              }}
            />
            <div className="absolute inset-0 flex justify-between items-center px-2">
              <div className="flex-1 text-center text-white text-[10px] font-medium">
                {team1.kills}
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 text-white text-[8px] font-medium">
                Total Kill
              </div>
              <div className="flex-1 text-center text-white text-[10px] font-medium">
                {team2.kills}
              </div>
            </div>
          </div>

          {/* Gold Bar */}
          <div className="relative h-[14px] bg-[#E84057] overflow-hidden">
            <div 
              className="absolute inset-y-0 left-0 bg-[#4171D6]" 
              style={{ 
                width: `${(team1.gold / (team1.gold + team2.gold)) * 100}%` 
              }}
            />
            <div className="absolute inset-0 flex justify-between items-center px-2">
              <div className="flex-1 text-center text-white text-[10px] font-medium">
                {team1.gold.toLocaleString()}
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 text-white text-[8px] font-medium">
                Total Gold
              </div>
              <div className="flex-1 text-center text-white text-[10px] font-medium">
                {team2.gold.toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        {/* Team 2 Objectives (Right) */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-1">
          <div className="flex items-center gap-1">
            <img 
              src="/objectives/dragon.png" 
              alt="Dragons" 
              className="w-4 h-4"
            />
            <span className="text-[#E84057] text-xs font-medium">{team2.dragons}</span>
          </div>
          <div className="flex items-center gap-1">
            <img 
              src="/objectives/baron.png" 
              alt="Barons" 
              className="w-4 h-4"
            />
            <span className="text-[#E84057] text-xs font-medium">{team2.barons}</span>
          </div>
          <div className="flex items-center gap-1">
            <img 
              src="/objectives/tower.png" 
              alt="Towers" 
              className="w-4 h-4"
            />
            <span className="text-[#E84057] text-xs font-medium">{team2.towers}</span>
          </div>
          <div className="flex items-center gap-1">
            <img 
              src="/objectives/inhibitor.png" 
              alt="Inhibitors" 
              className="w-4 h-4"
            />
            <span className="text-[#E84057] text-xs font-medium">{team2.inhibitors}</span>
          </div>
          <div className="flex items-center gap-1">
            <img 
              src="/objectives/herald.png" 
              alt="Heralds" 
              className="w-4 h-4"
            />
            <span className="text-[#E84057] text-xs font-medium">{team2.heralds}</span>
          </div>
          <div className="flex items-center gap-1">
            <img 
              src="/objectives/voidgrub.png" 
              alt="Voidgrubs" 
              className="w-4 h-4"
            />
            <span className="text-[#E84057] text-xs font-medium">{team2.voidgrubs}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

