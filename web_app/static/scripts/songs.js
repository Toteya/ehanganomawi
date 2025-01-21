// Handles the interactive functionality of the music player / songs page
$(document).ready(() => {
  let isPlaying = false;

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
  $('#play-pause').click(() => {
      playPauseAll();
      playPause.removeClass('fa-play');
  });

  const playPauseAll = () => {
    const playPromise = soprano.play();
    const icon = playPause.find('i');
    if (!isPlaying) {
      playPromise
        .then(() => {
          icon.removeClass('fa-play');
          icon.addClass('fa-pause');
          isPlaying = true;
        })
        .catch((err) => {
          console.log('Playback failed:', err);
          icon.removeClass('fa-pause');
          icon.addClass('fa-play');
          isPlaying = false;
        });
    } else {
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            soprano.pause();
            icon.removeClass('fa-pause');
            icon.addClass('fa-play');
            isPlaying = false;
          })
          .catch((err) => {
            console.log(err);
          })
      }
    }
  }

  // volume control
  volumeControl.on('input propertychange', function() {
    adjustVolume($(this).val());
  })

  const adjustVolume = (value) => {
    soprano.volume = value;
    alto.volume = value;
    tenor.volume = value;
    bass.volume = value;
  }

  // progress bar
  $('#soprano').on('timeupdate', function() {
    const currentTime = soprano.currentTime;
    const duration = soprano.duration;

    const currentMinutes = Math.floor(currentTime / 60);
    const currentSeconds = Math.floor(currentTime % 60);
    const totalMinutes = Math.floor(duration / 60);
    const totalSeconds = Math.floor(duration % 60);

    currentTimeDisplay.textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;
    totalTimeDisplay.textContent = `${totalMinutes}:${totalSeconds < 10 ? '0' : ''}${totalSeconds}`;

    const progress = (currentTime / duration) * 100;
    progressBar.value = progress;
  })

  // control muting of individual or all tracks
  const toggleMute = (audioItem, muteButton) => {
    const icon = muteButton.find('i');
    const span = muteButton.find('span.icon')
    if (audioItem.muted) {
      unmuteAudio(audioItem, icon, span);
    } else {
      muteAudio(audioItem, icon, span);
    }
  }

  const muteAudio = (audioItem, icon, span) => {
    audioItem.muted = true;
    icon.removeClass('fa-volume-high');
    icon.addClass('fa-volume-xmark');
    span.addClass('has-text-danger')
  }

  const unmuteAudio = (audioItem, icon, span) => {
    audioItem.muted = false;
    icon.removeClass('fa-volume-xmark');
    icon.addClass('fa-volume-high');
    span.removeClass('has-text-danger')
  }

  $('#mute-soprano').click(() => {
    toggleMute(soprano, muteSoprano);
  });

  $('#mute-alto').click(() => {
    toggleMute(alto, muteAlto);
  });

  $('#mute-tenor').click(() => {
    toggleMute(tenor, muteTenor);
  });

  $('#mute-bass').click(() => {
    toggleMute(bass, muteBass);
  });

  $('#unmute-all').click(() => {
    for (const item of items) {
      const icon = item.muteButton.find('i');
      const span = item.muteButton.find('span.icon')
      unmuteAudio(item.audioItem, icon, span);
    }
  });

  $('#mute-all').click(() => {
    for (const item of items) {
      const icon = item.muteButton.find('i');
      const span = item.muteButton.find('span.icon')
      muteAudio(item.audioItem, icon, span);
    }
  });


});
