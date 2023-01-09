FROM maven:3.6.3-openjdk-11-slim as build

# Set the working directory
WORKDIR /app

# Copy the pom.xml file and install dependencies
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy the source code
COPY src /app/src

# Build the application
RUN mvn package -DskipTests

# Create a new image from the openjdk base image
FROM openjdk:11-jdk-slim

# Set the working directory
WORKDIR /app

# Copy the built jar file from the build stage
COPY --from=build /app/target/*.jar .

# Expose the application on port 8080
EXPOSE 8080

# Run the application
CMD ["java", "-jar", "post-it-backend.jar"]