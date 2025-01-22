#!/usr/bin/env python3
"""
module composers:
Contains API endpoints related to composer objects
"""
from api.v1.views import app_views
from flask import abort, jsonify, request
from models import storage
from models.composer import Composer


@app_views.route('/composers', strict_slashes=False)
def get_composers():
    """ Returns all the composers in the database
    """
    composers = storage.all(Composer).values()
    composers_list = [composer.to_dict() for composer in composers]
    return jsonify(composers_list)

@app_views.route('/composers', methods=['POST'], strict_slashes=False)
def post_composer():
    """ Creates and saves a new composer object
    """
    name = request.form.get('name')
    if not name:
        abort(400, description="Composer's name is missing")
    
    composer = Composer(name=name)
    storage.new(composer)
    storage.save()
    storage.close()
