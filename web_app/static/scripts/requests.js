// Handles API requests

const getSongMelody = async (song_id, data = {}) => {
  $.ajax({
    type: 'GET',
    url: `http://127.0.0.1:5001/api/v1/songs/${song_id}/melodies`,
    data,
    contentType: 'application/json',
    success: (melodies) => {
      // Temp: For now just return the first melody object if multiple melodies are found
      return melodies[0];
    }
  });
}

export { getSongMelody };