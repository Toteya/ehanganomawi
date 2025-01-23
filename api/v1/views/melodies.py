#!/usr/bin/env python3
"""
module melodies:
Contains API endpoints related to melody objects
"""
from api.v1.views import app_views
from flask import abort, jsonify, request
from models import storage
from models.composer import Composer
from models.melody import Melody
from sqlalchemy.exc import IntegrityError


@app_views.route('/melodies', methods=['GET'], strict_slashes=False)
def get_melodies():
    """ Returns all the melodies on the database
    """
    melodies = storage.all(Melody).values()
    melodies_list = [melody.to_dict() for melody in melodies]
    return jsonify(melodies_list)


@app_views.route('/melodies/<melody_id>', methods=['GET'], strict_slashes=False)
def get_melody(melody_id):
    """ Returns the melody matching the given id
    """
    melody = storage.get(Melody, melody_id)
    if not melody:
        abort(404)
    return (melody.to_dict())


@app_views.route('/melodies', methods=['POST'], strict_slashes=False)
def post_melody():
    """ Creates and saves new melody object
    """
    filepath = request.form.get('filepath')
    composer_id = request.form.get('composer_id')
    if not filepath:
        abort(400, description='Title is missing')
    if composer_id == '':
        composer_id = None
        
    if composer_id and not storage.get(Composer, composer_id):
        abort(400, description='The composer id given does not exist.')

    melody = Melody(filepath=filepath, composer_id=composer_id)
    storage.new(melody)
    try:
        storage.save()
    except IntegrityError:
        storage.close()
        abort(400, description=f"A melody already exists with that filepath {filepath}.")
    storage.close()
    return jsonify(melody.to_dict())
