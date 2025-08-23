# Clean generated files and create folder
rm -rf src/generated
mkdir -p src/generated

# Copy react proxy library to version space
cp -R ../../../packages/react/src src/generated

echo "=> React project is copied"
