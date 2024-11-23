const BASE_URL = 'http://localhost:4000';

export const getSummonerByRiotId = async (gameName: string, tagLine: string): Promise<any> => {
  try {
    const response = await fetch(`http://localhost:4000/api/account/by-riot-id/${gameName}/${tagLine}`);
    if (!response.ok) {
      const errorDetails = await response.json();
      throw new Error(errorDetails.error || 'Erreur lors de la récupération des données par Riot ID');
    }
    return await response.json();
  } catch (error: any) {
    console.error('Erreur API Riot:', error.message);
    throw new Error(error.message || 'Erreur serveur');
  }
};

