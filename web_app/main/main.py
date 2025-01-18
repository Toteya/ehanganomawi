#!/usr/bin/env python3
"""
module main:
Renders main web app templates
"""
from web_app.main import app_main
from flask import render_template
from flask_login import login_required, current_user


@app_main.route('/')
def index():
    """ Renders index page
    """
    return render_template('index.html')


@app_main.route('/profile')
@login_required
def profile():
    """ Renders profile page
    """
    return render_template('profile.html', name=current_user.name)
