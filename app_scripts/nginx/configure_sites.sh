#!/bin/bash

# Set the path for checkroomie.conf in the script folder
script_folder="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
checkroomie_conf_file="$script_folder/checkroomie.conf"

# Verify if the checkroomie.conf file exists in the script folder
if [ ! -f "$checkroomie_conf_file" ]; then
    echo "checkroomie.conf file not found in the script folder."
    exit 1
fi

# Navigate to the Nginx configuration directory
cd /etc/nginx/conf.d/ || exit

# Set the path for checkroomie.conf
nginx_conf_path="/etc/nginx/conf.d/checkroomie.conf"

# Create the configuration file if it doesn't exist
sudo touch "$nginx_conf_path"

# Verify if the Nginx configuration file exists
if [ ! -f "$nginx_conf_path" ]; then
    echo "Nginx checkroomie.conf file not found."
    exit 1
fi

# Replace the content of the Nginx checkroomie.conf file with the content from the script folder checkroomie.conf file
sudo cp "$checkroomie_conf_file" "$nginx_conf_path"

# Test the configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
