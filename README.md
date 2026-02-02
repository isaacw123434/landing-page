# Commute Architect

Commute Architect is a tool to calculate and compare commute options (driving, public transport, hybrid) based on time and cost.

## Setup

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Run development server:**
    ```bash
    npm run dev
    ```

3.  **Build for production:**
    ```bash
    npm run build
    ```

## Deployment

This project is deployed to GitHub Pages using the `gh-pages` branch.

### How to Deploy

To deploy a new version:

1.  **Run the deploy script:**
    ```bash
    npm run deploy
    ```
    This command will automatically:
    *   Build the project (using `vite build`).
    *   Push the contents of the `dist` folder to the `gh-pages` branch.

2.  **Configure GitHub Pages:**
    *   Go to your repository settings on GitHub.
    *   Navigate to **Pages**.
    *   Under **Build and deployment** > **Source**, select **Deploy from a branch**.
    *   Under **Branch**, select `gh-pages` and the `/ (root)` folder.
    *   Click **Save**.

### Environment Variables

For the application to function correctly (especially the Firebase email collection), ensure you have a `.env` file for local development or appropriate environment configuration.

Since the deployment is static, the environment variables used during the build process must be available.

**Important:** When running `npm run deploy` locally, it will use your local `.env` variables (if setup) to build the application. Ensure you have the following variables defined in your environment or a `.env` file before deploying:

*   `VITE_FIREBASE_API_KEY`
*   `VITE_FIREBASE_AUTH_DOMAIN`
*   `VITE_FIREBASE_PROJECT_ID`
*   `VITE_FIREBASE_STORAGE_BUCKET`
*   `VITE_FIREBASE_MESSAGING_SENDER_ID`
*   `VITE_FIREBASE_APP_ID`

See [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) for detailed instructions on creating a Firebase project.
