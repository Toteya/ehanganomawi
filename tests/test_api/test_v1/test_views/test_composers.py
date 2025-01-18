#!/usr/bin/env python3
"""
module test_composers:
Contains pytests for API views - composers endpoints
"""
from test_app import client
import sys
import os
import pytest
from models import storage
from models.composer import Composer

sys.path.append(os.path.dirname(os.path.abspath(__file__)))


@pytest.fixture(scope='module')
def new_composer():
    composer1 = Composer(name='Sibelius')
    storage.new(composer1)
    storage.save()
    yield
    storage.delete(composer1)
    storage.save()


def test_composers(client, new_composer):
    """ Tests that composers route returns all existing composers
    """
    response = client.get('/api/v1/composers')
    assert response.status_code == 200
    assert len(response.json) == 1
