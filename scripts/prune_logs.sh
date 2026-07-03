#!/usr/bin/env bash
# delete logs older than 30 days
find /var/www/html/nextcloud_sacm/scripts/logs -type f -mtime +30 -delete

