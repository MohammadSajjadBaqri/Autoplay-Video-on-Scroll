// GIVING CREDIT TO PROGRAMMER IS COMPULSARY
// This code is programmed by Mohammad Sajjad Baqri
// Website: http://mohammadsajjadbaqri.github.io/

// READ ME: By having downloaded this code you have pledged to refrain from employing the code within this document for any unethical purposes. Furthermore, you have also commited to providing proper attribution to the original programmer Mohammad Sajjad Baqri when utilizing this code in your project.


// Wait for the DOM content to be fully loaded before executing the script
document.addEventListener('DOMContentLoaded', (event) => {
  // Select all video elements on the page
  const videos = document.querySelectorAll('video');
  
  // Variable to keep track of the currently playing video
  let currentlyPlayingVideo;

  // Intersection Observer configuration options
  const options = {
    root: null,         // Use the viewport as the root
    rootMargin: '0px',  // No margin around the root
    threshold: 1.0,     // Fully visible when 100% of the target is visible
  };

  // Function to play or pause the video based on the 'play' parameter
  function playOrPauseVideo(video, play) {
    if (play) {
      // If video is ready, play it
      if (video.readyState >= 2) {
        video.play();
      } else {
        // If video is not ready, wait for 'loadeddata' event before playing
        video.addEventListener('loadeddata', () => {
          video.play();
        });
      }
    } else {
      // Pause the video
      video.pause();
    }
  }

  // Intersection Observer callback function
  const observerCallback = (entries) => {
    const isVisible = entries[0].isIntersecting;
    const currentVideo = entries[0].target;

    if (isVisible) {
      // Play the video when it becomes visible
      playOrPauseVideo(currentVideo, true);

      // Pause the currently playing video if any
      if (currentlyPlayingVideo && currentlyPlayingVideo !== currentVideo) {
        playOrPauseVideo(currentlyPlayingVideo, false);
      }

      // Update currentlyPlayingVideo to the current video
      currentlyPlayingVideo = currentVideo;
    } else {
      // Pause the video when it goes out of view
      playOrPauseVideo(currentVideo, false);
    }
  };

  // Create an Intersection Observer instance with the specified callback and options
  const observer = new IntersectionObserver(observerCallback, options);

  // Observe each video element on the page
  videos.forEach(video => {
    observer.observe(video);
  });
});

// This code is downloaded from http://mohammadsajjadbaqri.github.io/Autoplay-Video-on-Scroll
