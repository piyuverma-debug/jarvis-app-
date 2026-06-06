# Android packaging guide

This project is already an installable PWA and a public deployment URL is set:

```text
https://jarvis-app.railway.app
```

## Fastest Android option: PWA install
1. Open on Android:
   ```text
   https://jarvis-app.railway.app
   ```
2. Tap **Install App** inside the app, or use browser **Add to Home Screen**.
3. The permanent QR is already included in the project:
   ```text
   qr/jarvis-app-railway-permanent-qr.png
   ```

## APK option: Capacitor Android shell
1. Install Node.js and Android Studio.
2. In this project folder, install Capacitor packages:
   ```bash
   npm install @capacitor/core @capacitor/cli @capacitor/android
   ```
3. Initialize Android platform:
   ```bash
   npm run android:add
   ```
4. Sync project files:
   ```bash
   npm run android:sync
   ```
5. Open Android Studio:
   ```bash
   npm run android:open
   ```
6. In Android Studio:
   - let Gradle sync finish
   - choose **Build > Build Bundle(s) / APK(s) > Build APK(s)**
   - or generate signed APK/AAB for Play Store

## Notes
- `capacitor.config.json` is already included.
- PWA install is easier and already works with the public Railway URL.
- For best results, keep backend env vars configured on Railway.
- Quick actions may behave differently depending on device/browser/app availability.
