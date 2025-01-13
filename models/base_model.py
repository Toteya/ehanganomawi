#!/usr/bin/python3
"""
module base_model: contains the BaseModel implementation
"""
from datetime import datetime
from uuid import uuid4

class BaseModel:
    """
    base / parent class upon which all class will be based 
    """
    def __init__(self, **kwargs):
        self.id = str(uuid4())
        self.created_at = datetime.now()
        self.updated_at = self.created_at

        time_format = "%Y-%m-%dT%H:%M:%S.%f"
        if kwargs:
            for key, value in kwargs.items():
                if key == '__class__':
                    continue
                if key == 'created_at':
                    self.created_at = datetime.strptime(value, time_format)
                    continue
                if key == 'updated_at':
                    self.updated_at = datetime.strptime(value, time_format)
                    continue
                if hasattr(self, key):
                    setattr(self, key, value)
            # if kwargs.get('password') and isinstance(self.password, str):
            #     try:
