#!/bin/sh
# Source the public directory to cd into
source ./path.sh

# If any part of the script fails the deploy stops
set -e

# Status message
printf "\033[0;32mDeploying updates to GitHub…\033[0m\n" 

# Go To Public folder 
public
pwd
git status

# Add changes to git. 
git add . 

# Commit changes. 
current="`date +'%Y-%m-%d %H:%M:%S'`"
msg="Deployed site: $current"
git commit -m "$msg"

# Push source and deploy. 
git push origin main