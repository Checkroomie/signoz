#!/bin/bash

# Install nginx
sudo apt install nginx

# Start nginx
sudo systemctl start nginx

# Enable nginx to restart on boot
sudo systemctl enable nginx

# Enable firewall
sudo ufw enable

# Open firewall for HTTP and HTTPS connection
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Reloading firewall
sudo ufw reload

# Checking firewall status
sudo ufw status

# Allow IP tables on Ubuntu Server
sudo iptables -I INPUT -p tcp --dport 80 -m conntrack --ctstate NEW,ESTABLISHED -j ACCEPT
sudo iptables -I OUTPUT -p tcp --sport 80 -m conntrack --ctstate ESTABLISHED -j ACCEPT
sudo iptables -I INPUT -p tcp --dport 443 -m conntrack --ctstate NEW,ESTABLISHED -j ACCEPT
sudo iptables -I OUTPUT -p tcp --sport 443 -m conntrack --ctstate ESTABLISHED -j ACCEPT
