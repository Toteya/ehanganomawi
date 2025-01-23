
#!/usr/bin/env python3
"""
module test_melodies:
Contains pytests for API views - melodies endpoints
"""
from test_app import client
from test_composers import create_composers
from models import storage
from models.composer import Composer
from models.melody import Melody
import pytest


@pytest.fixture(scope='module')
def create_melodies():
    """ Creates melody objects for testing
    """
    filepath1 = 'sweet_melody.m4a'
    composer_id = 'a6458a37-8b17' # Sibelius from create_composers fixture
    melody1 = Melody(filepath=filepath1, composer_id=composer_id,
                     id='df7943f3-2759')

    storage.new(melody1)
    storage.save()
    yield
    storage.delete_all(Melody)
    storage.save()
    storage.close()


def test_get_melody(client, create_composers,  create_melodies):
    """ Test that the endpoint returns the correct melody
    that matches the given ID
    """
    # Existing object id
    response = client.get('/api/v1/melodies/df7943f3-2759')
    assert response.status_code == 200
    assert response.json['filepath'] == 'sweet_melody.m4a'

    # Non-existing object id -> must return 404 error
    response = client.get('/api/v1/melodies/gibberish_id')
    assert response.status_code == 404


def test_post_melody(client, create_composers, create_melodies):
    """ Tests that the endpoint correctly creates a melody and adds it to
    the specified composer
    """
    # Post melody to existing composer -> SUCESS
    data = {'filepath': 'fav_tune.mp3', 'composer_id': 'a6458a37-8b17'}
    response = client.post('/api/v1/melodies/', data=data)
    assert response.status_code == 200
    composer = storage.get(Composer, 'a6458a37-8b17')
    melody_filepaths = [melody.filepath for melody in composer.melodies]
    assert 'fav_tune.mp3' in melody_filepaths
    assert len(composer.melodies) == 2

    # Post melody to without a composer -> SUCESS
    data = {'filepath': 'magic_sound.m4a'}
    response = client.post('/api/v1/melodies/', data=data)
    assert response.status_code == 200

    # Post melody non-existing composer -> 400 Error
    data = {'filepath': 'a_new_star.m4a', 'composer_id': 'non-existent_id'}
    response = client.post('/api/v1/melodies', data=data)
    assert response.status_code == 400

    # Post verse with missing filepath -> 400 Error
    data = {'filepath': None, 'composer_id': 'a6458a37-8b17'}
    response = client.post('/api/v1/melodies', data=data)
    assert response.status_code == 400

