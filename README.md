# Omawi

An application where you can search for popular choral songs, listen to the melody, and read the lyrics. Learn to sing your favourite songs the RIGHT way!

A database of popular choral songs, including a comprehensive collection of Oshiwambo songs.

## Table of Contents

- [Background](#background)
- [User Session](#user-session)
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

## User Session

The user is required to login to access the application.

## Usage and Controls

Once logged in, go to the songs page to access the songs and the music player.

Select any song from the `SONGS LIST` on the left sidebar (or menu on mobile).

The lyrics of the song will appear on the screen.

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

| Endpoint |  Route   | Role |
|:---------|:--------:|------:|
| get_songs| `/songs` | Returns all the songs in the DB |
| get_   |  `code`  |   $12 |
| L2   | _italic_ |    $1 |

### Admin endpoints
These API endpoint are reserved for admin purporses; involve access to and manipulation of sensitive or priveledged data, and will be setup not to be accessible to general users.

* 

## Contributors

Created by [Toteya Kamanja](https://github.com/Toteya)

## Resources and References
