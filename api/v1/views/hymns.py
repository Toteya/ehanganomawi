#!/usr/bin/env python3
"""
module hymns:
Contains API endpoints related to hymn objects
"""
from api.v1.views import app_views
from flask import abort, jsonify, request
from models import storage
from models.hymn import Hymn


@app_views.route('/hymns', strict_slashes=False)
def get_hymns():
    """ Returns all the hymns
    """
    hymns = storage.all(Hymn).values()
    hymns_list = [hymn.to_dict() for hymn in hymns]
    return jsonify(hymns_list)

@app_views.route('/hymns/<hymn_id>', methods=['GET'], strict_slashes=False)
def get_hymn(hymn_id):
    """ Returns the hymn matching the given id
    """
    hymn = storage.get(Hymn, hymn_id)
    if not hymn:
        abort(404)
    return (hymn.to_dict())

@app_views.route('/hymns', methods=['POST'], strict_slashes=False)
def post_hymn():
    """ Creates a new hymn
    """
    number = request.form.get('number')
    hymn = Hymn(number=number)
    storage.new(hymn)
    storage.save()

# @app_views.route('/hymns/<hymn_id>/verses', methods=['POST'],
#                  strict_slashes=False)
# def post_verse


# @app_views.route('composer/<composer_id>/hymns', methods=['GET'],
#                  strict_slashes=False)
# def get_hymns_by_composer(composer_id):
#     """ Returns all the hymns that match the given composer
#     """
