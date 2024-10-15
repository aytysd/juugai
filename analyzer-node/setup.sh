#!/bin/sh

echo "start sshd"
/usr/sbin/sshd -D

chmod 700 /root/.ssh
chmod 600 /root/.ssh/authorized_keys

# /bin/sh
exec "$@"
