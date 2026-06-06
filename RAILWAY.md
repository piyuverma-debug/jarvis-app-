# Firebase setup guide

This project includes **Firebase-ready auth + Firestore hooks** in the frontend.

## What is already scaffolded
- signup
- login
- logout
- auth status chip
- optional user profile sync to Firestore
- optional chat snippet sync to Firestore

## Steps
1. Create a Firebase project.
2. Enable **Authentication** (Email/Password).
3. Enable **Firestore Database**.
4. Add a **Web App** in Firebase project settings.
5. Copy values into the app Settings panel or use `firebase.config.example.json` as a reference.
6. In Firebase Auth settings, add your deployed domain to **Authorized domains**.

## Important note
The browser app uses Firebase's public web config values. These are normal to expose in frontend apps, but your **security rules** must be configured properly.

## Example Firestore collections used
- `users/{uid}`
- `users/{uid}/chatSnippets/{autoId}`

## Suggested Firestore rules starter
Adjust before production:

```text
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      match /chatSnippets/{snippetId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
    }
  }
}
```
