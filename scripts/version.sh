#!/bin/bash

# Get the current version number
CURRENT_VERSION=$(node -p "require('./package.json').version")

# Split the version number into its component parts
IFS='.' read -ra VERSION_PARTS <<< "$CURRENT_VERSION"

# Bump the patch version
PATCH=$((VERSION_PARTS[2] + 1))

# Update the version number in the package.json file
NEW_VERSION="${VERSION_PARTS[0]}.${VERSION_PARTS[1]}.$PATCH"
npm version $NEW_VERSION --no-git-tag-version

# Output the new version number
echo $NEW_VERSION
