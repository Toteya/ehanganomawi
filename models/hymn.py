#!/usr/bin/env python3
"""
module hymn: Contains Hymn implementation
"""
from models.base_model import Base, BaseModel, Column
from models.melody import hymn_melody_assoc_table
from sqlalchemy import ForeignKey, Integer, String
from sqlalchemy.orm import relationship


class Hymn(BaseModel, Base):
    """
    A hymn
    """
    __tablename__ = 'hymns'

    number = Column('number', Integer)
    # melody_id = Column('melody_id', String(45), ForeignKey('melodies.id'))

    verses = relationship('Verse')
    melodies = relationship('Melody', secondary=hymn_melody_assoc_table,
                            back_populates='hymns', viewonly=True)
