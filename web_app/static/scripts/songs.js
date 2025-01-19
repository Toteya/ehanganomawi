// Handles the interactive functionality of the music player / songs page
$(document).ready(() => {
    const soprano = document.getElementById('soprano');
    const alto = document.getElementById('alto');
    const tenor = document.getElementById('tenor');
    const bass = document.getElementById('bass');

    const muteSoprano = document.getElementById('mute-soprano')
    const muteAlto = document.getElementById('mute-alto')
    const muteTenor = document.getElementById('mute-tenor')
    const muteBass = document.getElementById('mute-bass')

    muteSoprano.click(() => {
        console.log('MUTE SOPRANO CLICKED!')
        soprano.muted = !soprano.muted;
        muteSoprano.classList.toggle('is-Active')
    });

    $('#mute-alto').click(function() {
        // alto.muted = !alto.muted;
        // $(this).classList.toggle('is-Active')
        const button = $(this)[0];
        button.classList.toggle('is-active');
    });

    $('#mute-tenor').click(() => {
        tenor.muted = !tenor.muted;
        $(this).classList.toggle('is-Active')
    });

    $('#mute-bass').click(() => {
        bass.muted = !bass.muted;
        $(this).classList.toggle('is-Active')
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
