#!/usr/bin/env python3
"""
module test_app:
Contains tests for API app
"""
import sys
import os
from api.v1.app import create_app
import pytest

sys.path.append(os.path.dirname(os.path.abspath(__file__)))
app = create_app()

@pytest.fixture
def client():
    """ A test client for the app
    """
    with app.test_client() as client:
        yield client

def test_status(client):
    """ Test the status route
    """
    response = client.get('/api/v1/status')
    assert response.status_code == 200
    assert response.json == {'Status': 'OK'}
