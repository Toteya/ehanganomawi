#!/usr/bin/env python3
"""
module melody:
Contains hymn melody implementation
"""
from models.base_model import Base, BaseModel, Column
from sqlalchemy import String


class Melody(BaseModel, Base):
    """
    The melody of a hymn
    """
    __tablename__ = 'melodies'
    
    filepath = Column('filepath', String(256))

    # Implement one-to-many relationship with hymn_ids
