#!/usr/bin/env python3
"""
module test_index:
Contains pytests for API views - index endpoints
"""
from models import storage
from models.composer import Composer
from models.hymn import Hymn
from models.user import User
from test_app import client
import pytest
import sys
import os

sys.path.append(os.path.dirname(os.path.abspath(__file__)))


@pytest.fixture(scope='module')
def create_objects():
    """ Creates and saves objects to the test database
    """
    storage.new(Composer(name='Chopin'))
    storage.new(Composer(name='Bach'))
    storage.new(Hymn(number=23))
    storage.new(User(name='Mike', email='mike@mail.com', password='myPass123'))
    storage.new(User(name='Marty', email='marty@oal.com', password='scrtPWD2'))
    storage.save()
    yield
    objs = storage.all().values()
    for obj in objs:
        storage.delete(obj)
    storage.save()


def test_status(client):
    """ Test the status route
    """
    response = client.get('/api/v1/status')
    assert response.status_code == 200
    assert response.json == {'Status': 'OK'}


def test_stats(client, create_objects):
    """ Test that the '/stats' route returns a summary of all existing objects
    """
    response = client.get('/api/v1/stats')
    assert response.status_code == 200
    assert response.json.get('Composers') == 2
    assert response.json.get('Hymns') == 1
    assert response.json.get('Users') == 2
