# Clean generated files and create folder
rm -rf src/generated
mkdir -p src/generated

# Copy angular proxy library to version space
cp -R ../../../packages/components-angular/common src/generated/common
cp -R ../../../packages/components-angular/src src/generated/src

echo "=> Angular project is copied"
