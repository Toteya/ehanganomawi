#!/usr/bin/env python3
"""
module hymn: Contains Hymn implementation
"""
from models.base_model import Base, BaseModel, Column
from models.melody import hymn_melody_assoc_table
from sqlalchemy import Integer
from sqlalchemy.orm import relationship


class Hymn(BaseModel, Base):
    """
    A hymn
    """
    __tablename__ = 'hymns'

    number = Column('number', Integer, unique=True)

    verses = relationship('Verse', backref='hymn', cascade='all, delete-orphan')
    melodies = relationship('Melody', secondary=hymn_melody_assoc_table,
                            back_populates='hymns', viewonly=True)
