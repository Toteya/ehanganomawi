#!/usr/bin/env python3
"""
module db_storage:
Contains MySQL database storage engine implementation
"""
from os import environ
from sqlalchemy import create_engine

class DBStorage:
    """
    MySQL database storage engine
    """
    __engine = None
    __session = None
    __classes = {}

    def __init__(self):
        user = environ.get('OMAWI')
