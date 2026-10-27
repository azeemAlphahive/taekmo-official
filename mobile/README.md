# TAEKMO Solar — Mobile App (iOS & Android)

Expo app that loads the official TAEKMO website in a native shell — same UI/content as the web, with splash screen, pull-to-refresh, and Android back navigation.

## Run locally

```bash
cd mobile
npm install
npx expo start
```

Then scan the QR code with **Expo Go** (Android) or the Camera app (iOS).

### Point at local Next.js (optional)

1. Run the website: `npm run dev` in the repo root  
2. Find your PC LAN IP (e.g. `192.168.1.10`)  
3. In `mobile/.env`:

```env
EXPO_PUBLIC_WEB_URL=http://192.168.1.10:3000
```

4. Restart Expo

Default URL is `https://www.taekmosolar.com`.

## Store builds (EAS)

```bash
npm i -g eas-cli
eas login
eas build -p android
eas build -p ios
```

`ios.bundleIdentifier` / `android.package`: `com.taekmosolar.app`
