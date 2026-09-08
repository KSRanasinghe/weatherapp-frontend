# Weather Comfort Ranking – Frontend

Frontend for the Weather Comfort Ranking app. Built with React, connects to the backend to show a ranked list of cities by weather comfort, behind an Auth0 login.

Backend repo: https://github.com/KSRanasinghe/weatherapp

---

## 1. Tech Stack

- Vite + React + TypeScript
- Axios (for calling the backend API)
- Tailwind CSS
- shadcn/ui (Table component, dark mode setup)
- lucide-react (icons)
- Auth0 (@auth0/auth0-react) for login and session handling

---

## 2. Setup Instructions

**Requirements**
- Node.js and npm

**Steps**
1. Clone this repo.
2. Install dependencies:
   
   ```
   npm install
   ```
3. Auth0 domain and client ID are already set in the code (these are safe to be public, not secret values).
4. Make sure the backend is running first (see backend repo above), since this app calls it directly.
5. Run the dev server:
   
   ```
   npm run dev
   ```
6. Open the local URL it gives you (usually `http://localhost:5173`).

**Test login**
- Email: `careers@fidenz.com`
- Password: `Pass#fidenz`

---

## 3. What I Built

- A login screen with a background image and a Log In button, shown when the user isn't authenticated yet.
- After login, a dashboard showing all 10 cities in a table, ranked by Comfort Score, with city name, weather description, temperature, and score.
- A loading message while the weather data is being fetched, so the page doesn't just show empty table headers.
- A dark/light mode toggle in the header.
- Responsive layout, works on both mobile and desktop screen sizes.
- Log Out button once logged in.

The app calls the backend's `/api/weather-all` endpoint using Axios, attaching the Auth0 access token to the request so the backend can verify the user is logged in.

---

## 4. Login and MFA

Login is handled by Auth0. Clicking "Log In" redirects to Auth0's own hosted login page (Universal Login), where the user enters the email and password above. Auth0 then redirects back to this app once login is successful.

**Important — first login needs an extra step.** Auth0 does not allow email to be used as a first-time MFA method. A user has to enroll in another factor first. For this project, that means:

1. On the very first login, after entering the email and password, Auth0 will show a QR code and ask to set up an authenticator app (like Google Authenticator). This has to be scanned and a one-time code entered to finish this first login.
2. On every login after that, instead of using the authenticator app again, there will be an option on the MFA screen called **"Try another method."** Selecting this and choosing **Email** will send a one-time code to the account's email address instead, which can be entered to log in.

This isn't something I could configure around — it's how Auth0 treats email as a factor. Auth0's own documentation explains that email is considered a weaker factor and isn't allowed to be the primary/first MFA method, only a secondary option once another factor already exists. Reference: https://auth0.com/docs/secure/multi-factor-authentication/multi-factor-authentication-factors/configure-email-notifications-for-mfa

So to properly test the email MFA flow, the test account needs to complete the one-time QR/authenticator setup first, then on the next login, choose "Try another method" → Email.

---

## 5. Dark / Light Mode

I used shadcn/ui's own documented approach for adding dark mode to a Vite project, and adjusted their `ModeToggle` component to fit this project (using a sun/moon icon from lucide-react). I didn't write this from scratch — I followed their guide and modified it to work with this app's layout.

Reference: https://ui.shadcn.com/docs/dark-mode/vite

---

## 6. Known Limitations

- Email MFA only becomes available from the second login onward, not the first (explained in section 4 above). This is a platform limitation from Auth0, not a bug in this app.
- No page routing was used since the app only has one real view (the dashboard, which shows either the login button or the table depending on login state).
- Auth0 domain and client ID are committed in the code as-is, since these values are meant to be public in frontend apps and aren't secrets.
