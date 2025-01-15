#!/usr/bin/env python3
"""
module user: Contains user account implementation
"""
from models.base_model import Base, BaseModel, Column
from sqlalchemy import String


class User(BaseModel, Base):
    """
    A user account
    """
    __tablename__ = 'users'

    name = Column('name', String(45))
    email = Column('email', String(45))
    password = Column('password', String(45))
