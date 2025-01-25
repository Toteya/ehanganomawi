// Handles API requests

const getSongMelody = async (song_id) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'GET',
      url: `http://127.0.0.1:5001/api/v1/songs/${song_id}/melodies`,
      contentType: 'application/json',
      success: (melodies) => {
        // TO BE UPDATED: For now just return the first melody object in the array
        resolve(melodies[0].filepath);
      },
      error: (error) => {
        reject(error);
      },
    });
  })
}

const getSongLyrics = async (song_id) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'GET',
      url: `http://127.0.0.1:5001/api/v1/songs/${song_id}/verses`,
      contentType: 'application/json',
      success: (verses) => {
        $('div.lyrics').empty();
        if (verses.length > 0) {
          for (const verse of verses) {
            const number = $('<h4></h4>');
            const lyrics = $('<p></p>');
            const linebreak = $('<br>');
            number.text(`${verse.number}.`);
            lyrics.text(verse.lyrics);
            $('div.lyrics').append(number, lyrics, linebreak);
          }
        } else {
          const p1 = $('<p></p>');
          const p2 = $('<p></p>');
          const line1 = $('<em></em>');
          const line2 = $('<em></em>');
          line1.text('Lyrics currently unvailable for this song.')
          line2.text('Please try again later.')
          p1.append(line1);
          p2.append(line2);
          $('div.lyrics').append(p1, p2);
        }
        resolve(verses)
      },
      error: (error) => {
        reject(error);
      },
    })
  })
}

export { getSongMelody, getSongLyrics };