# --- STAGE 1: Base Image ---
# We use a specific version of Node.js as the foundation for all other stages.
# Creating a 'base' stage prevents us from repeating the FROM and WORKDIR lines.
FROM node:22 AS base
# Set the initial working directory inside the container
WORKDIR /usr/local/app

# --- STAGE 2: Client Base ---
# This stage handles the front-end (React/Vite) dependencies and source code.
FROM base as client-base
# Copy only package files first. This uses Docker's layer caching so we
# don't re-download packages (npm install) unless these specific files change.
COPY client/package.json client/package-lock.json ./
RUN npm install
# After installing dependencies, copy the rest of the frontend code.
COPY client/index.html client/.eslintrc.cjs client/vite.config.js ./
COPY client/public ./public
COPY client/src ./src

# --- STAGE 3: Client Development ---
# Used specifically by Docker Compose to run the app locally while you code.
FROM client-base as client-dev
# Run the development server (e.g., Vite)
CMD ["npm", "run", "dev"]

# --- STAGE 4: Client Build ---
# This stage builds the production-ready static files for the frontend.
FROM client-base as client-build
# Compiles the frontend code into optimized HTML/CSS/JS inside a 'dist' folder.
RUN npm run build

# --- STAGE 5: Backend Base ---
# This stage handles the back-end (Node API) dependencies and source code.
FROM base as backend-base
# Copy backend package files and install dependencies
COPY backend/package.json backend/package-lock.json ./
RUN npm install
# Copy the Node.js backend source code
COPY backend/src ./src

# --- STAGE 6: Backend Development ---
# Used by Docker Compose to run the backend API locally while you code.
FROM backend-base as backend-dev
# Run the backend development server
CMD ["npm", "run", "dev"]

# --- STAGE 7: Backend Testing ---
# A dedicated stage for running automated tests.
FROM backend-base as backend-test
# Run tests. If this step fails, the Docker build process stops here!
RUN npm run test

# --- STAGE 8: Final Production Image ---
# This creates the actual, lean image that will be deployed to production.
FROM base AS final
# Set environment to production (makes many Node.js packages run faster)
ENV NODE_ENV=production

# By copying FROM 'backend-test', we guarantee tests pass before building this stage!
COPY --from=backend-test /usr/local/app/package.json /usr/local/app/package-lock.json ./

# Install ONLY production dependencies (ignores devDependencies) to keep the image small
RUN npm ci --production && \
    npm cache clean --force

# Copy the backend source code
COPY backend/src ./src
# Copy the built, optimized frontend assets from the 'client-build' stage (Stage 4).
# The backend server likely serves these static files to users.
COPY --from=client-build /usr/local/app/dist ./src/static

# Inform Docker that the container listens on port 3000
EXPOSE 3000

# Specify the command to start the production server
CMD ["node", "src/index.js"]