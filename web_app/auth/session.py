#!/usr/bin/env python3
"""
module session:
Handles and renders user authentication related routes and templates respectively
"""
from flask import render_template
from web_app.auth import app_auth

@app_auth.route('/login')
def login():
    """ Renders login page
    """
    return 'Login'

@app_auth.route('/signup')
def signup():
    """ Renders signing up page
    """
    return 'Signup'

@app_auth.route('/logout')
def logout():
    """ Handles logging out
    """
    return 'Logout'
