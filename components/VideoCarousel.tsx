import React, { useEffect, useRef } from 'react';

const VideoCarousel = () => {
  const videos = ['video1.mp4', 'video2.mp4']; // Replace with your video file names
  const videoRef = useRef(null);

  useEffect(() => {
    const currentVideo = videoRef.current;
    let currentVideoIndex = 0;

    const handleVideoEnd = () => {
      currentVideoIndex = (currentVideoIndex + 1) % videos.length; // Calculate the index of the next video
      currentVideo.src = `/videos/${videos[currentVideoIndex]}`;
      currentVideo.play();
    };

    currentVideo.addEventListener('ended', handleVideoEnd);
    currentVideo.play();

    return () => {
      currentVideo.removeEventListener('ended', handleVideoEnd);
    };
  }, []);

  return (
    <div className="relative">
      <br/>
      <video className="w-full h-auto" ref={videoRef} src={`/videos/${videos[0]}`} controls={false} loop muted playsInline>
        {/* Sorry, your browser doesn't support embedded videos. */}
      </video>
      
      <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-4xl font-bold mb-6 w-full text-center text-white">
        Stay Ahead of Job Trends with AI-Driven Insights
      </h1>
    </div>
  );
};

export default VideoCarousel;
