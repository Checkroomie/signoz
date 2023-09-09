#!/bin/bash

# Check if a reboot is required
if [ -f /var/run/reboot-required ]; then
    echo "Server needs rebooting."
else
    echo "Server does not require rebooting."
fi
