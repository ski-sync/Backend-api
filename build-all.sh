#!/bin/sh

# Loop over subdirectories in ./apps
for service_path in ./apps/*; do
    # Check if the item is a directory
    if [ -d "$service_path" ]; then
        # Extract only the name of the service (folder)
        service_name=$(basename "$service_path")
        echo "Building service: $service_name"
        # Assuming npm run build can accept a service name as argument
        npm run build "$service_name"
    fi
done