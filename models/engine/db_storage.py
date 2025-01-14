#!/usr/bin/env python3
"""
module db_storage:
Contains MySQL database storage engine implementation
"""
from models.base_model import Base
from os import environ
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker

class DBStorage:
    """
    MySQL database storage engine
    """
    __engine = None
    __session = None
    __classes = {}

    def __init__(self):
        user = environ.get('OMAWI_MYSQL_USER')
        password = environ.get('OMAWI_MYSQL_PWD')
        host = environ.get('OMAWI_MYSQL_HOST')
        database = environ.get('OMAWI_MYSQL_DB')
        
        db_url = f'mysql+mysqldb://{user}:{password}@{host}/{database}'

        self.__engine = create_engine(db_url)
        if environ.get('OMAWI_ENV') == 'test':
            print("RUNNING UNIT TESTS")
            Base.metadata.drop_all(self.__engine)
    
    def all(self, clss=None):
        """ Returns a dictionary containing all objects of the specified class.
        If no class is given return all object from all classes
        """
        pass
    
    def delete(self, obj=None):
        """ Deletes an object from the current session
        """
        if obj is not None:
            self.__session.delete(obj)
    
    def save(self):
        """ Commits all changes from the current session to the database
        """

    def get(self, clss=None, id=None):
        """ Returns an object based on the given id and class
        """
        if not all([clss, id]):
            return None
        obj = self.__session.query(clss).filter(clss.id == id).first()
        return obj

    def load(self):
        """ Loads data from the database and creates a new session
        """
        Base.metadata.create_all(self.__engine)
        session_factory = sessionmaker(bind=self.__engine,
                                       expire_on_commit=False)
        Session = scoped_session(session_factory)
        self.__session = Session

    def close(self):
        """ Closes/Removes the current session
        """
        self.__session.remove()
