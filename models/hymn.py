#!/usr/bin/env python3
"""
module hymn: Contains Hymn implementation
"""
from models.base_model import BaseModel
from sqlalchemy import Column
from sqlalchemy import DateTime, Integer, String


class Hymn(BaseModel):
    """
    A hymn
    """
    hymn_number = 0
    verses = {}
    melody = None
