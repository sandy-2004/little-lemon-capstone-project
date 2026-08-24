# Little Lemon Restaurant App

A modern, responsive cross-platform mobile application built with **React Native** and **Expo** for the Little Lemon Mediterranean Restaurant capstone project (Meta React Native Specialization).

---

## Features

- **Onboarding & Authentication Flow**
  - Welcome hero banner with restaurant branding and Mediterranean tagline.
  - Client-side form validation ensuring valid user input before progressing.
  - Persistent login state stored locally using `@react-native-async-storage/async-storage`.
  - Conditional navigation flow: automatically routes new users to Onboarding and authenticated users to Home.

- **Home & Interactive Menu**
  - **Dynamic Menu API**: Fetches and renders menu items, dish descriptions, pricing, and remote images.
  - **Live Search**: Instant real-time text search filtering dishes by title.
  - **Category Filter Chips**: Filter dishes across multiple categories (*Starters*, *Mains*, *Desserts*, *Drinks*) with toggleable multi-select state.
  - **Dynamic Header**: Displays user initials in the avatar button with 1-tap access to the profile screen.

- **User Profile & Settings**
  - View and edit user details (*First Name*, *Last Name*, *Email*, *Phone Number*).
  - Avatar placeholder with automatic initials extraction.
  - Granular notification preferences toggles (*Order statuses*, *Password changes*, *Special offers*, *Newsletter*).
  - Persistence for updated user profiles and preference states.
  - One-tap **Log Out** button that clears local storage and resets authentication.

---

## Tech Stack

- **Framework**: React Native (0.86)
- **Tooling & Runtime**: Expo SDK 57, React 19
- **Navigation**: React Navigation v7 (`@react-navigation/native`, `@react-navigation/native-stack`)
- **State & Storage**: React Context API (`AuthContext`), `@react-native-async-storage/async-storage`
- **UI & Icons**: `@expo/vector-icons` (Ionicons), `react-native-safe-area-context`, `react-native-screens`

---

## Project Structure

```text
little-lemon-capstone/
├── assets/                  # App icons, splash screens, and images
├── screens/
│   ├── Home.js              # Home screen with menu list, search & category filters
│   ├── Onboarding.js        # Onboarding registration & validation screen
│   └── Profile.js           # User profile & notification settings screen
├── App.js                   # Root component, AuthContext & Navigation Stack
├── app.json                 # Expo configuration
├── package.json             # Project dependencies & scripts
└── README.md                # Project documentation
```

---

## Color Palette & Theme

| Color | Hex Code | Usage |
| :--- | :--- | :--- |
| **Primary Green** | `#495E57` | Hero background, active buttons, branding |
| **Primary Yellow** | `#F4CE14` | Hero title highlight, action buttons |
| **Dark Charcoal** | `#333333` | Primary text, titles |
| **Light Neutral** | `#EDEFEE` / `#EEEEEE` | Category pills, dividers, card backgrounds |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Expo Go](https://expo.dev/go) app on your physical mobile device, or an iOS Simulator / Android Emulator.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/<your-username>/little-lemon-capstone.git
   cd little-lemon-capstone
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the Expo development server:**
   ```bash
   npx expo start
   ```

4. **Launch on a device or emulator:**
   - Press `a` in the terminal to launch the **Android Emulator**.
   - Press `i` to launch the **iOS Simulator**.
   - Press `w` to run on the **Web Browser**.
   - Scan the QR code using the **Expo Go** app on your physical iOS or Android device.

---

## Available Scripts

- `npm start` / `npx expo start` — Start the Expo Metro bundler.
- `npm run android` — Launch on Android emulator/device.
- `npm run ios` — Launch on iOS simulator.
- `npm run web` — Run web preview in the browser.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Acknowledgements

- **Meta Front-End Developer Professional Certificate** / **Meta React Native Specialization** Capstone Project.
- Restaurant branding and menu API courtesy of Meta.
