#!/usr/bin/env python3
"""
module test_verses:
Contains pytests for API views - verses endpoints
"""
from test_app import client
from test_hymns import create_hymns
from models import storage
from models.hymn import Hymn
from models.verse import Verse
import pytest


@pytest.fixture(scope='module')
def create_verses():
    """ Creates hymns and verses for testing purposes
    """
    hymn_id = '93016e68-8e7e'
    lyrics1 = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.\
     Proin vel libero ut libero ornare semper. Phasellus eu justo at nibh.'
    lyrics2 = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.\
     Aliquam mattis lacus in dolor dictum porta. Nam non dolor vitae nibh.'
    verse1 = Verse(hymn_id=hymn_id, number=1, lyrics=lyrics1,
                   id='07e14b1f-7162')
    verse2 = Verse(hymn_id=hymn_id, number=2, lyrics=lyrics2,
                   id='fa6e3dd3-f3cd')

    storage.new(verse1)
    storage.new(verse2)
    storage.save()
    yield
    storage.delete(verse1)
    storage.delete(verse2)
    storage.save()


def test_get_verse(client, create_hymns,  create_verses):
    """ Test that the endpoint returns the correct verse
    that matches the given ID
    """
    # Existing object id
    response = client.get('/api/v1/verses/fa6e3dd3-f3cd')
    assert response.status_code == 200
    assert response.json['number'] == 2
    assert 'Aliquam mattis' in response.json['lyrics']
    # Non-existing object id -> must return 404 error
    response = client.get('/api/v1/verses/fake_id')
    assert response.status_code == 404

def test_get_verses(client, create_hymns, create_verses):
    """ Test that the endpoint returns all the verses of the given hymn
    """
    response = client.get('/api/v1/hymns/93016e68-8e7e/verses')
    assert len(response.json) == 2
    verse_ids = [verse['id'] for verse in response.json]
    assert '07e14b1f-7162' in verse_ids
    assert 'fa6e3dd3-f3cd' in verse_ids

def test_post_verse(client, create_hymns, create_verses):
    """ Tests that the endpoint correctly creates a verse and adds it to
    the specified hymn
    """
    # Post verse to existing hymn -> SUCESS
    response = client.post('/api/v1/hymns/43870a5d-cbd0/verses',
                           data={
                               'number': '1',
                               'lyrics': 'Lorem ipsum dolor sit amet.'
                           })
    assert response.status_code == 200
    assert 'Success' in response.json
    hymn = storage.get(Hymn, '43870a5d-cbd0')
    assert 'Lorem ipsum dolor sit amet.' in hymn.verses[0].lyrics

    # Post verse non-existing hymn -> 404 Error
    response = client.post('/api/v1/hymns/wrong_id/verses',
                           data={
                               'number': '1',
                               'lyrics': 'Lorem ipsum dolor sit amet.'
                           })
    assert response.status_code == 404

    # Post verse with missing lyrics-> 404 Error
    response = client.post('/api/v1/hymns/43870a5d-cbd0/verses',
                           data={
                               'number': '1',
                           })
    assert response.status_code == 400

