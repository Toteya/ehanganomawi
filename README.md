# Omawi

An application where you can search for popular choral songs, listen to the melody, and read the lyrics. Learn to sing your favourite songs the RIGHT way!

A database of popular choral songs, including a comprehensive collection of Oshiwambo songs.

## Table of Contents

- [Background](#background)
- [Setup](#setup)
- [Usage and Controls](#usage-and-controls)
- [API](#api)
- [Contributors](#contributors)
- [Resources](#resources-and-references)

## Background

Choral music lovers often want a convenient and reliable way to find their favourite songs. They also want to know how to, not only sing their favourite song, but to sing it the RIGHT way!

OMAWI is a good platform for this, with a large collection of popular choral songs, including a comprehensive collection of Oshiwambo songs.

Users can listen to the different voices of the melody (soprano, alto, tenor and bass) so they can learn how to sing it properly and even teach it to their choir friends.

This project has been created and submitted as a Portfolio Project for the ALX SE program (Backend Specialisation).

#### Stacks used in this project:
- Python: Backend business logic
- Flask, Flask-Login: Application, API, User session managment
- MySQL, SQLAlchemy: Data persistence, Data management
- PyTest, Unittest: For functional and unit testing of the API and models
- HTML
- Jvascript JQuery: Frontend scripting
- Web Audio API: Audio rendering, control and manipulation
- Bulma (CSS): Frontend Styling

## Setup
Python version 3.10

#### Install the required Python libraries:
* Flask (3.1.0) and Flask-Login (0.6.3):
`pip install flask flask-login`

* SQLAlchemy (2.0.20):
`pip install SQLAlchemy`

#### Run MySQL dump:
`bash restore_dev_db.sh`

#### Start the Flask API and Web Application Server (Dev):
`bash start_api.sh`
`bash start_web_app.sh`

#### Browse:
http://localhost:5000

## Usage and Controls

The user is required to login to access the application.

Once logged in, go to the songs page to access the songs and the music player.

Select any song from the `SONGS LIST` on the left sidebar (or menu on mobile).

The lyrics of the song will appear at the bottom of the screen.

Press the `PLAY` button to listen to the melody of the song.

Control the volume using the `VOLUME` bar.

Seek (skip) forwards and backwards using the `PROGRESS` bar.

#### Sound Mixer:
Select the buttons `SOPRANO`, `ALTO`, `TENOR`, and `BASS` to mute or unmute a specific voice (channel). Use the `ALL` buttons to mute or unmute all the voices.

#### Routes

* `/` : homepage
* `/profile` : user profile page
* `/songs` : main application page - songs list, music player
* `/login` : login page
* `/signup` : singup page

## API

API Base URL: '/api/v1'

### General endpoints

| Endpoint | Route               | Method | Role                                 |
|:---------|:--------------------|:------:|:-------------------------------------|
| status   | `/status`          | `GET`  | Returns the current status of the API |
| get_composers |  `/composers`  | `GET`  | Returns all the composers            |
| get_melodies | `/melodies`     | `GET`  | Returns all the melodies             |
| get_melody | `/melodies/<melody_id>` | `GET` | Returns the matching melody     |
| get_song_melodies | `/songs/<song_id>/melodies` | `GET` | returns all the melody linked to a song |
| get_song |  `/songs/<song_id>` | `GET`  | Returns the song that matches the id |
| get_songs | `/songs`           | `GET`  | Returns all the songs                |
| get_verse | `/verses/<verse_id>` | `GET` | Returns the matching verse          |
| get_verses | `/songs/<song_id>` | `GET` | Returns the all the verses of the matching song |

### Admin endpoints
These API endpoints are for admin functions; and will be setup not to be accessible to general users.

| Endpoint   | Route               | Method | Role                               |
|:-----------|:--------------------|:------:|:-----------------------------------|
| stats      | `/stats`     | `GET` | Returns a summary of all objects in the DB |
| post_composer | `/composers`     | `POST` | Creates a new composer (name)      |
| post_melody | `/melodies` | `POST` | Creates a new melody (filepath, *composer_id) |
| post_song_melodies | `/songs/<song_id>/melodies/<melody_id>` | `POST` | Adds a melody to a song |
| post_song  | `/songs`            | `POST` | Creates a new song (title, *number) |
| delete_verse | `/verses/<verse_id>` | `DELETE` | Deletes the matching verse    |
| post_verse | `/verses`        | `POST` | Creates a new verse (song_id, lyrics) |

(*)optional parameter - POST data

## Contributors

Created by [Toteya Kamanja](https://github.com/Toteya)

## Resources and References
