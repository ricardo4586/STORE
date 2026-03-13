import React from 'react';

const BackgroundVideo = ({ videoSrc }) => {
  return (
    <div style={styles.videoContainer}>
      <video
        autoPlay
        loop
        muted
        playsInline
        style={styles.video}
      >
        <source src={videoSrc} type="video/mp4" />
      </video> {/* <--- Aquí estaba el error, ya está corregido */}
      
      {/* Capa oscura para que el texto sea legible */}
      <div style={styles.overlay}></div>
    </div>
  );
};

const styles = {
  videoContainer: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1, // Se mantiene al fondo
    overflow: 'hidden',
  },
  video: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'radial-gradient(circle, rgba(10,10,11,0.3) 0%, rgba(10,10,11,0.5) 100%)',
  }
};

export default BackgroundVideo;