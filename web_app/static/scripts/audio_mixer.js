// Handles the interactive functionality of the music player / songs page

$(document).ready(() => {
  // Create audio context with Web Audio API to allow for audio manupulation
  let audioContext;
  let audioBuffers;
  let gainNodes;
  let sources = [];
  let startTime;
  let offsetTime = 0;

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
    // The AudioContext will not be allowed to start at this stage.
    // It will be resumed (or created) after a user gesture (when the play button is clicked).
  }

  const playPause = $('#play-pause');

  const volumeControl = $('#volume-control');
  const progressBar = $('#progress-bar')[0];
  const currentTimeDisplay = $('#current-time')[0];
  const totalTimeDisplay = $('#total-time')[0];

  const muteSoprano = $('#mute-soprano')
  const muteAlto = $('#mute-alto')
  const muteTenor = $('#mute-tenor')
  const muteBass = $('#mute-bass')

  const muteButtons = [muteSoprano, muteAlto, muteTenor, muteBass]

  // control playing and pausing
  playPause.click(() => {
    if(sources.length !== 0) {
      // normal play-pause control
      playPauseAll();
    } else {
      // enable the audioContext through a user gesture (button click)
      // decode audio and create buffer source(s)
      audioContext.resume().then(() => {
        offsetTime = 0;
        startPlayback();
        const icon = playPause.find('i');
        icon.removeClass('fa-play');
        icon.addClass('fa-pause');
      })
    }
  });

  const startPlayback = () => {
    const currentTime = audioContext.currentTime;
    // startTime = currentTime - offsetTime;
    startTime = currentTime;
    audioBuffers.forEach( (buf, index) => {
      const source = audioContext.createBufferSource();
      source.buffer = buf;
      source.connect(gainNodes[index]);
      gainNodes[index].connect(audioContext.destination);
      sources.push(source);
      $(source).on('ended', () => {
        // remove source from array / clear the sources array
        sources = sources.filter(s => s !== source);
        resetPlayerUI();
      })
      // start all audios after 0.5s just to be safe (to ensure they're in sync)
      source.start(currentTime + 0.5, offsetTime);
      requestAnimationFrame(updateProgressBar);
    });
  }

  const playPauseAll = () => {
    const icon = playPause.find('i');
    if (audioContext.state === 'running') {
      // PAUSE
      audioContext.suspend().then(() => {
        icon.removeClass('fa-pause');
        icon.addClass('fa-play');
      })
    } else if (audioContext.state === 'suspended') {
      // PLAY
      audioContext.resume().then(() => {
        requestAnimationFrame(updateProgressBar);
        icon.removeClass('fa-play');
        icon.addClass('fa-pause');
      })
    }
  }


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
    const duration = audioBuffers[0].duration;
    const progressTime = audioContext.currentTime - startTime + offsetTime;

    const currentMinutes = Math.floor(progressTime / 60);
    const currentSeconds = Math.floor(progressTime % 60);
    const totalMinutes = Math.floor(duration / 60);
    const totalSeconds = Math.floor(duration % 60);

    setTimeDisplay(currentTimeDisplay, currentSeconds, currentMinutes);
    setTimeDisplay(totalTimeDisplay, totalSeconds, totalMinutes);

    const progress = (progressTime / duration) * 100;
    progressBar.value = progress;
    if (progressTime < duration && audioContext.state === 'running') {
      requestAnimationFrame(updateProgressBar);
    }
  }

  const setTimeDisplay = (timeDisplay, seconds, minutes) => {
    timeDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  $('#progress-bar').on('input propertychange', function() {
    if (sources.length === 0) {
      return;
    }
    // cancelAnimationFrame(reqID);
    sources.forEach((source) => source.stop());
    const progress = $(this).val();
    const duration = audioBuffers[0].duration;
    offsetTime = (duration * progress) / 100;
    startPlayback(offsetTime);
  });

  // Initialise the PlayerUI / icons, progress bar, time
  const resetPlayerUI = () => {
    let duration;
    try {
      duration = audioBuffers[0].duration;
    } catch {
      duration = 0;
    }
    const totalMinutes = Math.floor(duration / 60);
    const totalSeconds = Math.floor(duration % 60);    
    setTimeDisplay(currentTimeDisplay, 0, 0);
    setTimeDisplay(totalTimeDisplay, totalSeconds, totalMinutes);
    progressBar.value = 0;

    const icon = playPause.find('i');
    icon.removeClass('fa-pause');
    icon.addClass('fa-play');
  }
  resetPlayerUI();

  // control muting of individual or all tracks
  const toggleMute = (muteButton, gain) => {
    const icon = muteButton.find('i');
    const span = muteButton.find('span.icon')
    if (!gain.value) {
      unmuteAudio(icon, span, gain);
    } else {
      muteAudio(icon, span, gain);
    }
  }

  const muteAudio = (icon, span, gain) => {
    gain.value = 0;
    icon.removeClass('fa-volume-high');
    icon.addClass('fa-volume-xmark');
    span.addClass('has-text-danger')
  }

  const unmuteAudio = (icon, span, gain) => {
    gain.value = 1;
    icon.removeClass('fa-volume-xmark');
    icon.addClass('fa-volume-high');
    span.removeClass('has-text-danger')
  }

  $('#mute-soprano').click(() => {
    const gain = gainNodes[0].gain
    toggleMute(muteSoprano, gain);
  });

  $('#mute-alto').click(() => {
    const gain = gainNodes[1].gain;
    toggleMute(muteAlto, gain);
  });

  $('#mute-tenor').click(() => {
    const gain = gainNodes[2].gain;
    toggleMute(muteTenor, gain);
  });

  $('#mute-bass').click(() => {
    const gain = gainNodes[3].gain;
    toggleMute(muteBass, gain);
  });

  $('#unmute-all').click(() => {
    muteButtons.forEach((muteButton, index) => {
      const gain = gainNodes[index].gain;
      const icon = muteButton.find('i');
      const span = muteButton.find('span.icon')
      unmuteAudio(icon, span, gain);
    });
  });

  $('#mute-all').click(() => {
    muteButtons.forEach((muteButton, index) => {
      const gain = gainNodes[index].gain;
      const icon = muteButton.find('i');
      const span = muteButton.find('span.icon')
      muteAudio(icon, span, gain);
    });
  });
});
