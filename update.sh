#!/bin/sh
# If any part of the script fails the deploy stops.
set -e

# Status message
printf "\033[0;32mUpdating build to GitHub…\033[0m\n" 

# Update with any commits the CMS might have added.
git pull

# Build the project. 
hugo

# Add changes to git. 
git add . 

# Commit changes. 
current="`date +'%Y-%m-%d %H:%M:%S'`"
msg="Updated build: $current"
git commit -m "$msg"

# Push source. 
git push origin main