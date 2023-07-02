import React from 'react';

const VideoPlayer = (props )=> {
    const {videoId} = props;
    return (
        <div style={{ position: 'fixed', width: '100%', height: '100%'}}>
          <iframe
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none' // Disable mouse events on the iframe
            }}
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=0&showinfo=0&rel=0&loop=1&playlist=${videoId}`}
            title="Video Player"
            frameBorder="0"
            allow="autoplay; fullscreen"
            // allowFullScreen
          />
        </div>
    );
};

export default VideoPlayer;