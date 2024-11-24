import React from 'react';

const BackgroundVideo: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full overflow-hidden z-[-1]">
      <video
        className="min-w-full min-h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/assets/videos/background-video.webm" type="video/webm" />
        <source src="/src/dataBGionia.mp4" type="video/mp4" />
        Votre navigateur ne prend pas en charge la balise vidéo.
      </video>
    </div>
  );
};

export default BackgroundVideo;

