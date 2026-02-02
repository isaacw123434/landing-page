# Firebase Setup Guide

This project uses Firebase Firestore to store collected email addresses. Follow these steps to set up your own Firebase project and connect it to this application.

## 1. Create a Firebase Project

1.  Go to the [Firebase Console](https://console.firebase.google.com/).
2.  Click **Add project**.
3.  Name your project (e.g., `commute-architect`).
4.  Disable Google Analytics (optional, not needed for this feature).
5.  Click **Create project**.

## 2. Enable Firestore Database

1.  In the left sidebar, click **Build** -> **Firestore Database**.
2.  Click **Create database**.
3.  Select a location (choose one close to your users, e.g., `eur3` for Europe).
4.  Start in **Production mode**.
5.  Click **Create**.

## 3. Set Security Rules (Crucial for Security)

To ensure your database is secure and only accepts valid email submissions, you must configure the Security Rules.

1.  Go to the **Rules** tab in the Firestore section.
2.  Replace the existing rules with the following:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /emails/{emailId} {
      // Allow creation only if:
      // 1. The data contains an 'email' field.
      // 2. The 'email' field is a string.
      // 3. The 'email' looks like an email address.
      // 4. The 'createdAt' field is a server timestamp.
      allow create: if request.resource.data.email is string
                    && request.resource.data.email.matches('^[^@]+@[^@]+\\.[^@]+$')
                    && request.resource.data.createdAt == request.time;

      // Deny all other operations (read, update, delete) from the client sdk.
      // You can still view/edit data in the Firebase Console.
      allow read, update, delete: if false;
    }
  }
}
```

3.  Click **Publish**.

## 4. Add a Web App and Get Configuration

1.  Click the **Project Overview** (gear icon) -> **Project settings**.
2.  Scroll down to "Your apps" and click the **Web** icon (</>).
3.  Register the app (e.g., `Commute Architect Web`).
4.  You will see a configuration object (`firebaseConfig`). You need the values from this object.

## 5. Environment Configuration

You need to provide the Firebase configuration keys to the application.

### For Local Development

1.  Create a file named `.env` in the root of the project.
2.  Add the following variables using the values from your Firebase config:

    ```env
    VITE_FIREBASE_API_KEY=your_api_key
    VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
    VITE_FIREBASE_PROJECT_ID=your_project_id
    VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
    VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
    VITE_FIREBASE_APP_ID=your_app_id
    ```

### For GitHub Actions (Build Verification)

To ensure the project builds correctly in the repository (via the automated checks), you must add these keys as Repository Secrets.

1.  Go to your GitHub repository.
2.  Click **Settings** -> **Secrets and variables** -> **Actions**.
3.  Click **New repository secret**.
4.  Add the same secrets listed above:
    *   `VITE_FIREBASE_API_KEY`
    *   `VITE_FIREBASE_AUTH_DOMAIN`
    *   `VITE_FIREBASE_PROJECT_ID`
    *   `VITE_FIREBASE_STORAGE_BUCKET`
    *   `VITE_FIREBASE_MESSAGING_SENDER_ID`
    *   `VITE_FIREBASE_APP_ID`
