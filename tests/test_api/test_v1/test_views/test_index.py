#!/usr/bin/env python3
"""
module test_index
Tests API views - index
"""
from test_app import client
import sys
import os

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

def test_status(client):
    """ Test the status route
    """
    response = client.get('/api/v1/status')
    assert response.status_code == 200
    assert response.json == {'Status': 'OK'}
