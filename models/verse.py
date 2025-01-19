#!/usr/bin/env python3
"""
module verse:
Contains hymn verses implementation
"""
from models.base_model import Base, BaseModel, Column
from sqlalchemy import ForeignKey, Integer, String


class Verse(BaseModel, Base):
    """
    A verse of a hymn
    """
    __tablename__ = 'verses'

    hymn_id = Column('hymn_id', String(45), ForeignKey('hymns.id',
                                                       ondelete='CASCADE'))
    number = Column('number', Integer)
    lyrics = Column('lyrics', String(1028))

    __mapper_args__ = {'confirm_deleted_rows': False}
