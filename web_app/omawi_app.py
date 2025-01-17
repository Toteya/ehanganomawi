#!/usr/bin/env python3
"""
module omawi_app:
Main Flask app to serve web static content
"""
from web_app.main import app_main
from web_app.auth import app_auth
from flask import Flask
import os


def create_app():
    """ Creates and initialises the web app
    """
    app = Flask(__name__)

    config_type = os.getenv('CONFIG_TYPE', 'web_app.config.DevelopmentConfig')
    app.config.from_object(config_type)
    # Non-auth routes
    app.register_blueprint(app_main)
    # Routes requiring auth
    app.register_blueprint(app_auth)

    return app

app = create_app()

if __name__ == '__main__':
    host = app.config['HOST']
    port = app.config['PORT']
    app.run(host=host, port=port, threaded=True, debug=True)
