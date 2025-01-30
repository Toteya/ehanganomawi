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
- Flask (3.1.0) and Flask-Login (0.6.3):
`pip install flask flask-login`

- SQLAlchemy (2.0.20):
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

### Public endpoints

| Endpoint                                 | Role                                     |
|:-----------------------------------------|:-----------------------------------------|
| `GET** /api/v1/status`                   | Returns the current status of the API    |
| `GET** /api/v1/composers`                | Returns all the composers                |
| `GET** /api/v1/melodies`                 | Returns all the melodies                 |
| `GET** /api/v1/melodies/<melody_id>`     | Returns the matching melody              |
| `GET** /api/v1/songs/<song_id>/melodies` | Returns all the melody linked to a song  |
| `GET** /api/v1/songs/<song_id>`          | Returns the song that matches the id     |
| `GET** /api/v1/songs`                    | Returns all the songs                    |
| `GET** /api/v1/verses/<verse_id>`        | Returns the matching verse               |
| `GET** /api/v1/songs/<song_id>`   | Returns the all the verses of the matching song |

### Admin (private) endpoints
These API endpoints are for admin functions; and will be setup not to be accessible to general users.

| Endpoint                       | Role                                           |
|:-------------------------------|:-----------------------------------------------|
| `GET** /api/v1/stats`          | Returns a summary of all objects in the DB     |
| `POST** /api/v1/composers`     | Creates a new composer (name)                  |
| `POST** /api/v1/melodies`      | Creates a new melody (filepath, *composer_id)  |
| `POST** /api/v1/songs/<song_id>/melodies/<melody_id>` | Adds a melody to a song |
| `POST** /api/v1/songs`         | Creates a new song (title, *number)            |
| `DELETE** /api/v1/verses/<verse_id>` | Deletes the matching verse               |
| `POST** /api/v1/verses`        | Creates a new verse (song_id, lyrics)          |

(*)optional parameter - POST data

## Contributors

Created by [Toteya Kamanja](https://github.com/Toteya)

## Resources and References
