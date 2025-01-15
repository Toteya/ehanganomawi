#!/usr/bin/env python3
"""
module melody:
Contains hymn melody implementation
"""
from models.base_model import Base, BaseModel, Column
from sqlalchemy import Column as Col
from sqlalchemy import ForeignKey, String, Table
from sqlalchemy.orm import relationship


hymn_melody_assoc_table = Table(
    'hymn_melody_assoc_table',
    Base.metadata,
    Col('hymn_id', String(45), ForeignKey('hymns.id'), primary_key=True),
    Col('melody_id', String(45), ForeignKey('melodies.id'), primary_key=True)
)

class Melody(BaseModel, Base):
    """
    The melody of a hymn
    """
    __tablename__ = 'melodies'
    
    filepath = Column('filepath', String(256))
    composer_id = Column('composer_id', String(45), ForeignKey('composers.id'), nullable=True)

    hymns = relationship('Hymn', secondary='hymn_melody_assoc_table',
                         back_populates='melodies', viewonly=True)
    composer = relationship('Composer', back_populates='melodies')
