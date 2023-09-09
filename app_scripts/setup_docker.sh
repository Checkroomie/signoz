#!/bin/bash

# Add Docker’s official GPG key
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

# Set up the repository
echo \
  "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Update the package repositories
sudo apt-get update

# Install Docker Engine, containerd, and Docker Compose
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Verify Docker and Docker Compose version
docker --version
docker compose version

# Start Docker
sudo systemctl start docker

# Enable Docker to restart on boot
sudo systemctl enable docker

# Add the current user to the Docker group
sudo usermod -aG docker $USER

# Refresh the current user session
newgrp docker
