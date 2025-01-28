#!/usr/bin/bash
cat dev_tools/init_dev_db.sql | mysql -uroot -p
mysql -uroot -p omawi_dev_db < ./dev_tools/omawi_dev_dump.sql
