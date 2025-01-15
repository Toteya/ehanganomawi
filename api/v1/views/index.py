#!/usr/bin/env python3
"""
API index
"""
from flask import jsonify
from api.v1.views import app_views


@app_views.route('/status', strict_slashes=False)
def status():
    """ Returns the current status of the API
    """
    return jsonify({"status": "OK"})
