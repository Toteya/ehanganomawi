// Handles API requests

const getSongMelody = async (song_id, data = {}) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'GET',
      url: `http://127.0.0.1:5001/api/v1/songs/${song_id}/melodies`,
      data,
      contentType: 'application/json',
      success: (melodies) => {
        // TO BE UPDATED: For now just return the first melody object in the array
        resolve(melodies[0].filepath);
      },
      error: (error) => {
        reject(error);
      }
    });
  })
}

export { getSongMelody };