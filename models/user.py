#!/usr/bin/env python3
"""
module user: Contains user account implementation
"""
from models.base_model import BaseModel
from sqlalchemy import Column, String


class User(BaseModel):
    """
    A user account
    """
    email = ''
    password = ''
    