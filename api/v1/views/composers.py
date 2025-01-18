#!/usr/bin/env python3
"""
module composers:
Contains API endpoints related to composer objects
"""
from api.v1.views import app_views
from flask import jsonify
from models import storage
from models.composer import Composer


@app_views.route('/composers', strict_slashes=False)
def composer():
    """ Returns all the composers in the database
    """
    composers = storage.all(Composer).values()
    composers_list = [composer.to_dict() for composer in composers]
    return jsonify(composers_list)
