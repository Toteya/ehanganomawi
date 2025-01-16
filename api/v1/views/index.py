#!/usr/bin/env python3
"""
API index endpoints
"""
from api.v1.views import app_views
from flask import jsonify


@app_views.route('/status', strict_slashes=False)
def status():
    """ Returns the current status of the API
    """
    return jsonify({"Status": "OK"})

# implement stats endpoint
