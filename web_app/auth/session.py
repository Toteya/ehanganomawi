#!/usr/bin/env python3
"""
module session:
Handles and renders user authentication related routes and templates respectively
"""
from web_app.auth import app_auth
from flask import render_template, redirect, url_for


@app_auth.route('/login')
def login():
    """ Renders login page
    """
    return render_template('login.html')


@app_auth.route('/signup')
def signup():
    """ Renders signing up page
    """
    return render_template('signup.html')


# @app_auth.route('')


@app_auth.route('/logout')
def logout():
    """ Handles logging out
    """
    return 'Logout'
