#!/usr/bin/env python3
"""
module session_auth:
Contains API user authentication endpoints implemenation
"""
from api.v1.auth import app_auth
from flask import jsonify

@app_auth.route('/login')
def login():
    """ Handles user account login
    """
    return 'Login'

@app_auth.route('/signup')
def signup():
    """ Handles user account signing up
    """
    return 'Signup'

@app_auth.route
def logout():
    """ Handles user account logout
    """
    return 'Logout'
