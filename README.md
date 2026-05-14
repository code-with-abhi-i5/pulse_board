# 🚀 FusionBoard

**FusionBoard** is a fully responsive, modern, production-quality React.js Dashboard Web App that combines multiple real-time public APIs into one elegant platform. 

Designed with a premium UI combining elements from modern SaaS admin panels, it features glassmorphism effects, smooth animations, gradient accents, and dark/light modes.

## ✨ Features

- **🌦️ Advanced Weather Dashboard:** Real-time conditions, 5-day forecasts, and detailed metrics using OpenWeatherMap.
- **📰 Modern News Feed:** Categorized latest headlines with search functionality and masonry grid layouts using NewsAPI.
- **😂 Interactive Joke Generator:** A fun way to get jokes by categories with favorites and history support using JokeAPI.
- **💰 Crypto Analytics:** Live cryptocurrency market data, top 10 trends, and interactive sparkline charts using CoinGecko API.
- **🎨 Premium UI/UX:** Built with Tailwind CSS, featuring glass cards, shimmer loading states, and Framer Motion animations.
- **🌗 Theme Support:** Persistent Dark/Light mode toggle.
- **⚡ Performance:** Built with Vite, React Hooks (useContext, useCallback, useMemo), and debounced search.

## 🛠 Tech Stack

- **Framework:** React.js (Vite)
- **Routing:** React Router DOM
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **HTTP Client:** Axios
- **Charts:** Recharts
- **Icons:** React Icons

## 🚀 Installation Guide

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/fusionboard.git
   cd fusionboard
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env` file in the root directory and add your API keys (see API Setup below).

4. **Start the development server:**
   ```bash
   npm run dev
   ```

## 🔑 API Setup & Environment Variables

You need to obtain free API keys from the following providers:
- **Weather API:** [OpenWeatherMap](https://openweathermap.org/api)
- **News API:** [NewsAPI.org](https://newsapi.org/)

Create a `.env` file in the root directory:

```env
VITE_WEATHER_API_KEY=your_openweathermap_api_key
VITE_NEWS_API_KEY=your_newsapi_key
```
*(Note: CoinGecko and JokeAPI used in this project do not require an API key for basic usage).*

## 📸 Screenshots
*(Add your project screenshots here)*
- Dashboard Overview
- Dark / Light Mode
- Responsive Mobile View

## 🌍 Deployment

This project is optimized for deployment on platforms like **Vercel**, **Netlify**, or **Firebase Hosting**.

1. **Create a production build:**
   ```bash
   npm run build
   ```
2. The optimized files will be generated in the `dist/` directory.

### Vercel / Netlify
Connect your GitHub repository directly to Vercel or Netlify. The build settings should automatically be detected:
- **Build Command:** `npm run build`
- **Output Directory:** `dist`

Don't forget to add your Environment Variables in the platform's settings panel.

## 🔮 Future Improvements

- Add PWA support with offline caching.
- Expand Crypto section with detailed coin analytics.
- Integrate authentication for personalized dashboards.
- Add user-customizable dashboard widgets.

## 📄 License

This project is licensed under the MIT License.
