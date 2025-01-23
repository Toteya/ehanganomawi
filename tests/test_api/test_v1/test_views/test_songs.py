#!/usr/bin/env python3
"""
module test_songs:
Contains pytests for API views - songs endpoints
"""
from test_app import client
from models import storage
from models.song import Song
import pytest


@pytest.fixture(scope='module')
def create_songs():
    """ Creates song objects for testing
    """
    song34 = Song(number=34, title='Song 34', id='93016e68-8e7e')
    song22 = Song(number=22, title='Song 22', id='43870a5d-cbd0')
    storage.new(song34)
    storage.new(song22)
    storage.save()
    yield
    storage.delete(song34)
    storage.delete(song22)
    storage.save()
    storage.close()


def test_get_songs(client, create_songs):
    """ Test that the endpoint returns all existing songs in the database
    """
    response = client.get('/api/v1/songs')
    assert response.status_code == 200
    assert len(response.json) == 2

def test_get_song(client, create_songs):
    """ Test that the endpoint returns the correct song matching the given ID
    """
    response = client.get('/api/v1/songs/93016e68-8e7e')
    assert response.status_code == 200
    assert response.json['number'] == 34
