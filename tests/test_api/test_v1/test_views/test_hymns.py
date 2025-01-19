#!/usr/bin/env python3
"""
module test_hymns:
Contains pytests for API views - hymns endpoints
"""
from test_app import client
from models import storage
from models.hymn import Hymn
import pytest


@pytest.fixture(scope='module')
def create_hymns():
    """ Creates hymn objects for testing
    """
    hymn34 = Hymn(number=34, id='93016e68-8e7e')
    hymn22 = Hymn(number=22, id='43870a5d-cbd0')
    storage.new(hymn34)
    storage.new(hymn22)
    storage.save()
    yield
    storage.delete(hymn34)
    storage.delete(hymn22)
    storage.save()


def test_get_hymns(client, create_hymns):
    """ Test that the endpoint returns all existing hymns in the database
    """
    response = client.get('/api/v1/hymns')
    assert response.status_code == 200
    assert len(response.json) == 2

def test_get_hymn(client, create_hymns):
    """ Test that the endpoint returns the correct hymn matching the given ID
    """
    response = client.get('/api/v1/hymns/93016e68-8e7e')
    assert response.status_code == 200
    assert response.json['number'] == 34
