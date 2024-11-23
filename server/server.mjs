app.get('/api/player/stats/:puuid', async (req, res) => {
  const { puuid } = req.params;

  try {
    // Récupérer le profil du joueur
    const profileUrl = `https://europe.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`;
    const profileResponse = await fetch(profileUrl, {
      headers: {
        'X-Riot-Token': RIOT_API_KEY,
      },
    });

    if (!profileResponse.ok) {
      return res.status(500).json({ error: 'Impossible de récupérer le profil du joueur' });
    }
    const profileData = await profileResponse.json();

    // Récupérer les statistiques classées
    const rankedUrl = `https://europe.api.riotgames.com/lol/league/v4/entries/by-summoner/${profileData.id}`;
    const rankedResponse = await fetch(rankedUrl, {
      headers: {
        'X-Riot-Token': RIOT_API_KEY,
      },
    });

    if (!rankedResponse.ok) {
      return res.status(500).json({ error: 'Impossible de récupérer les statistiques classées' });
    }
    const rankedData = await rankedResponse.json();

    // Récupérer l'historique des matchs
    const matchIdsUrl = `https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=5`;
    const matchIdsResponse = await fetch(matchIdsUrl, {
      headers: {
        'X-Riot-Token': RIOT_API_KEY,
      },
    });

    if (!matchIdsResponse.ok) {
      return res.status(500).json({ error: 'Impossible de récupérer les identifiants des matchs' });
    }
    const matchIds = await matchIdsResponse.json();

    // Récupérer les détails des matchs
    const matchDetails = [];
    for (const matchId of matchIds) {
      const matchUrl = `https://europe.api.riotgames.com/lol/match/v5/matches/${matchId}`;
      const matchResponse = await fetch(matchUrl, {
        headers: {
          'X-Riot-Token': RIOT_API_KEY,
        },
      });

      if (matchResponse.ok) {
        const matchData = await matchResponse.json();
        matchDetails.push(matchData);
      }
    }

    // Réponse consolidée
    res.json({
      profile: profileData,
      ranked: rankedData,
      matches: matchDetails,
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques du joueur:', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});
