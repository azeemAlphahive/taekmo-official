# TAEKMO Solar — Native Mobile App

Native Expo (React Native) app that mirrors the Next.js website UI — **not a WebView**.

## Screens
- Home (hero, stats, featured products, solutions, why TAEKMO)
- Products + product detail
- Verify (calls `/api/verify`)
- Contact + newsletter (calls `/api/contact`, `/api/newsletter`)
- About / Solutions

## Run

```bash
cd mobile
npm install
npx expo start -c
```

### iOS Expo Go login
```bash
npx expo login --no-browser
```
Then sign into Expo Go with the **same** account.

### API URL
Defaults to `https://taekmo-official.com`. For local website APIs:

```env
EXPO_PUBLIC_API_URL=http://YOUR_LAN_IP:3000
```
