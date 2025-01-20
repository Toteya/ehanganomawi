// Handles the interactive functionality of the music player / songs page
$(document).ready(() => {
  const soprano = $('#soprano');
  const alto = $('#alto');
  const tenor = $('#tenor');
  const bass = $('#bass');

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

  const toggleMute = (audioItem, muteButton) => {
    const icon = muteButton.find('i');
    if (audioItem.muted) {
      unmuteAudio(audioItem, icon);
    } else {
      muteAudio(audioItem, icon);
    }
  }

  const muteAudio = (audioItem, icon) => {
    audioItem.muted = true;
    icon.removeClass('fa-volume-high');
    icon.addClass('fa-volume-xmark');
  }

  const unmuteAudio = (audioItem, icon) => {
    audioItem.muted = false;
    icon.removeClass('fa-volume-xmark');
    icon.addClass('fa-volume-high');
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
      unmuteAudio(item.audioItem, icon);
    }
  });

  $('#mute-all').click(() => {
    for (const item of items) {
      const icon = item.muteButton.find('i');
      muteAudio(item.audioItem, icon);
    }
  });

  $('#play').click(() => {
    soprano.play();
    alto.play();
    tenor.play();
    bass.play();
  });

  $('#pause').click(() => {
    soprano.pause();
    alto.pause();
    tenor.pause();
    bass.pause();
  });
});
