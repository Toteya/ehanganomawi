#!/usr/bin/env python3
"""
module hymn: Contains Hymn implementation
"""
from models.base_model import Base, BaseModel, Column
from sqlalchemy import Integer, String


class Hymn(BaseModel, Base):
    """
    A hymn
    """
    __tablename__ = 'hymns'

    number = Column('number', Integer)
    melody_id = Column('melody_id', String(45))
    verses = []
