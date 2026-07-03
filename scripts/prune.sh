#!/usr/bin/env bash
# delete logs older than 30 days
find /var/www/html/nextcloud_sacm/scripts/logs -type f -mtime +30 -delete

# delete tmp files after 1 week
find /mnt/NextcloudSacmData/admin/files/tmp -type f -ctime +3 -delete
sudo -u www-data php /var/www/html/nextcloud_sacm/occ files:scan --path admin/files/tmp
