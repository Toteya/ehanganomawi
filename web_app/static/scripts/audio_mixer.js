export let audioContext;
export let audioBuffers;
$(document).ready(() => {
  const audioSources = [
    $('#soprano').find('source'),
    $('#alto').find('source'),
    $('#tenor').find('source'),
    $('#bass').find('source'),
  ];

  try {
    audioContext = new (window.AudioContext || window.webkitAudioContext());
  } catch (error) {
    window.alert('Your browser does not support the Web Audio API.');
  }

  if (audioContext !== undefined) {
    // Implementation
    (async() => {
      const paths = audioSources.map((audioSource) => audioSource.attr('src'));
      
      // fetch data for each audio source file
      const dataBuffers = await Promise.all(
        paths.map( (path) => fetch( path ).then( (res) => res.arrayBuffer() ) )
      );
      // decode audio data
      audioBuffers = await Promise.all(
        dataBuffers.map( (buf) => audioContext.decodeAudioData( buf ) )
      );
   })();
  }

  // Handle user gesture to enable the AudioContext
  const playButton = $("#play-mixer");
  playButton.click(() => {
    audioContext.resume()
      .then(() => {
        const current_time = audioContext.currentTime;
        audioBuffers.forEach( (buf) => {
          const source = audioContext.createBufferSource();
          source.buffer = buf;
          source.connect(audioContext.destination);
          // start all audios after 0.5s just to be safe (to ensure they're in sync)
          source.start( current_time + 0.5 );
        } );
      })
  });
});