# 🌦️ Meteoscope

A modern, full-stack weather dashboard that lets you search for any city and view current conditions, hourly forecasts, and 7-day forecasts with beautiful weather-themed visuals and animations.

**Built with:** React + TypeScript + Vite (frontend) • FastAPI + Python (backend) • Open-Meteo API (weather data)

---

## 🎯 Features

- **🔍 City Search** – Debounced search with geocoding to find any city worldwide
- **🌡️ Real-time Weather** – Current temperature, weather code, and wind speed
- **📊 Forecast Data** – Hourly and 7-day weather forecasts
- **🎨 Dynamic Theming** – Weather-responsive UI that adapts to conditions
- **✨ Weather Effects** – Animated visual effects matching the weather (rain, clouds, etc.)
- **⚡ Optimized Performance** – React Query for caching, debounced search, memoized theme calculations
- **📱 Responsive Design** – Works seamlessly on desktop and mobile with Tailwind CSS

---

## 📦 Tech Stack

### Frontend
- **React 19** – UI library with hooks
- **TypeScript 6.0** – Type-safe development
- **Vite 8** – Lightning-fast build tool with HMR
- **Tailwind CSS 4** – Utility-first styling
- **React Router 7** – Client-side routing
- **TanStack React Query 5** – Data fetching and caching
- **Recharts 3** – Chart visualization
- **Axios** – HTTP client
- **Lucide React** – Icon library

### Backend
- **FastAPI 0.139** – Modern async web framework
- **Python 3.x** – Language runtime
- **Uvicorn** – ASGI server
- **httpx** – Async HTTP client
- **Pydantic** – Data validation
- **python-dotenv** – Environment configuration

### APIs
- **Open-Meteo** – Free weather forecasts
- **Open-Meteo Geocoding** – City search & coordinate lookup

---

## 🗂️ Project Structure

```
meteoscope/
├── frontend/                    # React + TypeScript application
│   ├── src/
│   │   ├── App.tsx             # Main app component with search & state
│   │   ├── components/         # Reusable UI components
│   │   │   └── weather/        # Weather-specific components (HeroCard, WeatherFX)
│   │   ├── hooks/              # Custom React hooks
│   │   ├── services/           # API client (axios instance)
│   │   ├── theme/              # Weather theme utilities
│   │   ├── utils/              # Helper functions
│   │   ├── assets/             # Images, icons
│   │   ├── App.css             # Global styles
│   │   ├── index.css           # Base styles
│   │   └── main.tsx            # Entry point
│   ├── package.json            # Dependencies
│   ├── vite.config.ts          # Vite configuration
│   ├── tsconfig.json           # TypeScript configuration
│   └── index.html              # HTML entry point
│
├── backend/                     # FastAPI server
│   ├── app/
│   │   ├── main.py             # FastAPI app setup, CORS, routes
│   │   └── services/           # Business logic
│   │       ├── weather.py      # Weather data fetching (Open-Meteo)
│   │       └── geocoding.py    # City search & geocoding
│   ├── requirements.txt        # Python dependencies
│   ├── .env                    # Environment variables (Open-Meteo URL)
│   └── runthisaoo.bat          # Windows startup script
```

### Data Flow
1. **Frontend** → User searches for a city name
2. **Debounced search** (400ms) triggers backend `/search` endpoint
3. **Backend** queries Open-Meteo Geocoding API → returns city coordinates
4. **Frontend** displays dropdown with search results
5. **On click** → Backend `/weather` endpoint fetches current + forecast data
6. **Frontend** applies theme based on weather code → renders dashboard with animations

---

## 🚀 Getting Started

### Prerequisites
- **Node.js 18+** (for frontend)
- **Python 3.9+** (for backend)
- **npm** or **yarn** (frontend package manager)

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Create a virtual environment:**
   ```bash
   python -m venv .venv
   ```

3. **Activate the virtual environment:**
   - **Windows:**
     ```bash
     .venv\Scripts\activate
     ```
   - **macOS/Linux:**
     ```bash
     source .venv/bin/activate
     ```

4. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

5. **Set up environment variables:**
   ```bash
   # .env file (already configured)
   OPEN_METEO_URL=https://api.open-meteo.com/v1/forecast
   ```

6. **Run the server:**
   ```bash
   uvicorn app.main:app --reload
   ```
   Server runs on `http://localhost:8000`

   **Alternative (Windows batch file):**
   ```bash
   runthisaoo.bat
   ```

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```
   Frontend runs on `http://localhost:5173`

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Preview production build:**
   ```bash
   npm run preview
   ```

---

## 🔌 API Endpoints

### Weather Endpoint
```
GET /weather?lat={latitude}&lon={longitude}
```

**Response:**
```json
{
  "temperature": 22.5,
  "weathercode": 0,
  "windspeed": 5.2,
  "hourly": {
    "time": ["2026-07-05T00:00", "2026-07-05T01:00", ...],
    "temperature": [20.1, 19.8, ...],
    "weathercode": [0, 1, ...]
  },
  "daily": {
    "time": ["2026-07-05", ...],
    "temperature_2m_max": [25.0, ...],
    "temperature_2m_min": [18.0, ...],
    "weather_code": [0, ...]
  }
}
```

### Search Endpoint
```
GET /search?city={city_name}
```

**Response:**
```json
[
  {
    "name": "New York",
    "country": "United States, New York",
    "lat": 40.7128,
    "lon": -74.0060
  },
  ...
]
```

---

## 🎨 Key Components

### Frontend
- **App.tsx** – Main app state management, search logic, weather theme selection
- **HeroCard** – Displays current weather and detailed forecast data
- **WeatherFX** – Renders weather-specific animations and effects
- **weatherTheme** – Utility that returns colors/backgrounds based on weather code

### Backend
- **main.py** – FastAPI app initialization with CORS middleware configured for `localhost:5173`
- **weather.py** – Async weather data fetching and formatting
- **geocoding.py** – City search with error handling and data formatting

---

## 💡 Development Notes

### Performance Optimizations
- ✅ **Debounced search** – 400ms delay prevents excessive API calls
- ✅ **Memoized theme** – `useMemo` prevents unnecessary recalculations
- ✅ **React Query** – Caches weather data to minimize refetches
- ✅ **CORS middleware** – Configured on backend for frontend origin

### Error Handling
- Network timeouts (10s) handled gracefully
- Malformed API responses caught and logged
- Whitespace-only queries rejected at source
- Safe fallback data mapping with `.get()` to avoid KeyErrors

---

## 🧪 Scripts

### Frontend
```bash
npm run dev       # Start dev server with HMR
npm run build     # Build TypeScript + Vite bundle
npm run lint      # Run ESLint checks
npm run preview   # Preview production build locally
```

### Backend
```bash
uvicorn app.main:app --reload    # Run with auto-reload
python -m pip install -r requirements.txt  # Install deps
```

---

## 📝 License

This project is open source. Feel free to fork, modify, and use!

---

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs via issues
- Suggest features
- Submit pull requests

---

## 🔗 Resources

- [Open-Meteo Weather API](https://open-meteo.com/)
- [Open-Meteo Geocoding](https://open-meteo.com/en/docs/geocoding-api)
- [FastAPI Docs](https://fastapi.tiangolo.com/)
- [React 19 Docs](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite Guide](https://vitejs.dev/)

---

**Made with ❤️ for weather enthusiasts**
