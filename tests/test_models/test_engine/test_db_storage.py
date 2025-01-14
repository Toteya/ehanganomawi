#!/usr/bin/env python3
"""
module test_db_storage:
Contains unittests for db_storage
"""
from models import storage
from models.user import User
from unittest import TestCase


class TestDBStorage(TestCase):
    """
    Tests DBStorage - MYSQL database storage engine
    """

    def setUp(self):
        storage.load()
        return super().setUp()

    def tearDown(self):
        storage.close()
        return super().tearDown()
    
    def test_all(self):
        """ all() method must return all the objects stored in the database
        Also, new() and save() must add a new object to a session and commits
        the commit the changes respectively.
        """
        self.assertEqual(len(storage.all()), 0)
        storage.new(User(email='user1@mail.com', password='myPass123'))
        storage.save()
        self.assertEqual(len(storage.all()), 1)
