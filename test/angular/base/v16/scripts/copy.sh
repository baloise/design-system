# Clean generated files and create folder
rm -rf src/generated
mkdir -p src/generated

# Copy angular proxy library to version space
cp -R ../../../packages/angular-common/src src/generated/common
cp -R ../../../packages/angular-legacy/src src/generated/legacy

echo "=> Angular project is copied"
