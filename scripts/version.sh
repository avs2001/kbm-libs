#!/bin/bash

# Get the current branch name
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)

# Loop through the projects in the workspace
for DIR in $(ls -d projects/*); do
  # Check if the project has a package.json file
  if [ -f "$DIR/package.json" ]; then
    # Check if the project has changes on the current branch
    if git diff --name-only HEAD..origin/$CURRENT_BRANCH -- $DIR >/dev/null; then
      # Get the current version number
      CURRENT_VERSION=$(node -p "require('./$DIR/package.json').version")

      # Split the version number into its component parts
      IFS='.' read -ra VERSION_PARTS <<< "$CURRENT_VERSION"

      # Bump the patch version
      PATCH=$((VERSION_PARTS[2] + 1))

      # Update the version number in the package.json file
      NEW_VERSION="${VERSION_PARTS[0]}.${VERSION_PARTS[1]}.$PATCH"
      npm --prefix ./$DIR version $NEW_VERSION --no-git-tag-version

      # Output the new version number
      echo "$DIR: $CURRENT_VERSION -> $NEW_VERSION"
    fi
  fi
done
