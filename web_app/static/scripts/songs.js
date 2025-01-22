// Handles the interactive functionality of the music player / songs page

$(document).ready(() => {
  let isPlaying = false;
  // let audSourceIsConnected = false;
  // let offsetStartTime = 0;

  // Create audio context with Web Audio API to allow for audio manupulation
  let audioContext;
  let audioBuffers;
  let gainNodes;
  let sources = [];

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
      // create audio buffers / decode the audio data
      audioBuffers = await Promise.all(
        dataBuffers.map( (buf) => audioContext.decodeAudioData( buf ) )
      );
      // gain nodes to allow mute/unmute individual tracks
      gainNodes = audioBuffers.map(() => audioContext.createGain());
    })();
  }

  const playPause = $('#play-pause');

  const volumeControl = $('#volume-control');
  const progressBar = $('#progress-bar')[0];
  const currentTimeDisplay = $('#current-time')[0];
  const totalTimeDisplay = $('#total-time')[0];

  const soprano = $('#soprano')[0];
  const alto = $('#alto')[0];
  const tenor = $('#tenor')[0];
  const bass = $('#bass')[0];

  const muteSoprano = $('#mute-soprano')
  const muteAlto = $('#mute-alto')
  const muteTenor = $('#mute-tenor')
  const muteBass = $('#mute-bass')

  const items = [
    {'audioItem': soprano, 'muteButton': muteSoprano},
    {'audioItem': alto, 'muteButton': muteAlto},
    {'audioItem': tenor, 'muteButton': muteTenor},
    {'audioItem': bass, 'muteButton': muteBass},
  ];


  // control playing and pausing
  playPause.click(() => {
    if(sources.length !== 0) {
      // normal play-pause control
      playPauseAll();
    } else {
      // initialise audioContext, decode audio and create buffer source(s)
      audioContext.resume().then(() => {
        const current_time = audioContext.currentTime;
        startPlayback(current_time, 0);
        const icon = playPause.find('i');
        icon.removeClass('fa-play');
        icon.addClass('fa-pause');
        // audSourceIsConnected = true;
      })
    }
  });

  const startPlayback = (current_time, offsetTime) => {
    audioBuffers.forEach( (buf, index) => {
      const source = audioContext.createBufferSource();
      source.buffer = buf;
      source.connect(gainNodes[index]);
      gainNodes[index].connect(audioContext.destination);
      sources.push(source);
      $(source).on('ended', () => {
        console.log('Playback finished!')
        // remove source from array
        sources = sources.filter(s => s !== source);
        resetPlayerUI();
      })
      // start all audios after 0.5s just to be safe (to ensure they're in sync)
      source.start( current_time + 0.5, offsetTime );
      // offsetStartTime = 0;
      requestAnimationFrame(updateProgressBar);
    });
  }

  const playPauseAll = () => {
    const icon = playPause.find('i');
    if (audioContext.state === 'running') {
      audioContext.suspend().then(() => {
        icon.removeClass('fa-pause');
        icon.addClass('fa-play');
        isPlaying = false;
      })
    } else if (audioContext.state === 'suspended') {
      audioContext.resume().then(() => {
        icon.removeClass('fa-play');
        icon.addClass('fa-pause');
        isPlaying = false;
      })
    }
  }


  $('#soprano').on('ended', function() {
    isPlaying = false;
    const icon = playPause.find('i');
    icon.removeClass('fa-pause');
    icon.addClass('fa-play');
    soprano.currentTime = 0;
  })

  // volume control
  volumeControl.on('input propertychange', function() {
    adjustVolume($(this).val());
  })

  const adjustVolume = (value) => {
    gainNodes.forEach((node) => {
      node.gain.value = value;
    })
  }

  function updateProgressBar() {
    const currentTime = audioContext.currentTime;
    const duration = audioBuffers[0].duration;

    const currentMinutes = Math.floor(currentTime / 60);
    const currentSeconds = Math.floor(currentTime % 60);
    const totalMinutes = Math.floor(duration / 60);
    const totalSeconds = Math.floor(duration % 60);

    setTimeDisplay(currentTimeDisplay, currentSeconds, currentMinutes);
    setTimeDisplay(totalTimeDisplay, totalSeconds, totalMinutes);

    const progress = (currentTime / duration) * 100;
    progressBar.value = progress;
    if (currentTime < duration) {
      requestAnimationFrame(updateProgressBar);
    } else {
    }
  }

  const setTimeDisplay = (timeDisplay, seconds, minutes) => {
    timeDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  $('#progress-bar').on('input propertychange', function() {
    if (sources.length === 0) {
      return;
    }
    sources.forEach((source) => source.stop());
    const progress = $(this).val();
    const duration = audioBuffers[0].duration;
    const newTime = (duration * progress) / 100;
    const current_time = audioContext.currentTime;

    startPlayback(current_time, newTime);

  });

  // initialise player UI
  // $('#soprano').on('loadedmetadata', () => {
  const resetPlayerUI = () => {
    // const duration = soprano.duration;
    let duration
    try {
      duration = audioBuffers[0].duration;
    } catch {
      duration = 0;
    }
    const totalMinutes = Math.floor(duration / 60);
    const totalSeconds = Math.floor(duration % 60);
    setTimeDisplay(totalTimeDisplay, totalSeconds, totalMinutes);

    const icon = playPause.find('i');
    icon.removeClass('fa-pause');
    icon.addClass('fa-play');
  }
  resetPlayerUI();

  // control muting of individual or all tracks
  const toggleMute = (audioItem, muteButton, gain) => {
    const icon = muteButton.find('i');
    const span = muteButton.find('span.icon')
    // if (audioItem.muted) {
    if (!gain.value) {
      unmuteAudio(audioItem, icon, span, gain);
    } else {
      muteAudio(audioItem, icon, span, gain);
    }
  }

  const muteAudio = (audioItem, icon, span, gain) => {
    audioItem.muted = true;
    gain.value = 0;
    icon.removeClass('fa-volume-high');
    icon.addClass('fa-volume-xmark');
    span.addClass('has-text-danger')
  }

  const unmuteAudio = (audioItem, icon, span, gain) => {
    audioItem.muted = false;
    gain.value = 1;
    icon.removeClass('fa-volume-xmark');
    icon.addClass('fa-volume-high');
    span.removeClass('has-text-danger')
  }

  $('#mute-soprano').click(() => {
    const gain = gainNodes[0].gain
    toggleMute(soprano, muteSoprano, gain);
  });

  $('#mute-alto').click(() => {
    const gain = gainNodes[1].gain;
    toggleMute(alto, muteAlto, gain);
  });

  $('#mute-tenor').click(() => {
    const gain = gainNodes[2].gain;
    toggleMute(tenor, muteTenor, gain);
  });

  $('#mute-bass').click(() => {
    const gain = gainNodes[3].gain;
    toggleMute(bass, muteBass, gain);
  });

  $('#unmute-all').click(() => {
    items.forEach((item, index) => {
      const gain = gainNodes[index].gain;
      const icon = item.muteButton.find('i');
      const span = item.muteButton.find('span.icon')
      unmuteAudio(item.audioItem, icon, span, gain);
    });
  });

  $('#mute-all').click(() => {
    items.forEach((item, index) => {
      const gain = gainNodes[index].gain;
      const icon = item.muteButton.find('i');
      const span = item.muteButton.find('span.icon')
      muteAudio(item.audioItem, icon, span, gain);
    });
  });

});
