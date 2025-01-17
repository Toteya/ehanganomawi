#!/usr/bin/env python3
"""
Flask API blueprint for routes requiring authentication
"""
from flask import Blueprint

app_auth = Blueprint('app_auth', __name__, url_prefix='/api/v1')

from api.v1.auth.session_auth import *
