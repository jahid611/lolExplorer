interface RuntimeConfig {
    RIOT_API_KEY?: string;
    API_BASE_URL: string;
    DDRAGON_VERSION: string;
    DDRAGON_LANG: string;
  }
  
  export function getRuntimeConfig(): RuntimeConfig {
    return {
      RIOT_API_KEY: import.meta.env.VITE_RIOT_API_KEY,
      API_BASE_URL: 'http://localhost:4000/api',
      DDRAGON_VERSION: '14.23.1',
      DDRAGON_LANG: 'fr_FR'
    };
  }
  
  