# 🌦️ Meteoscope

A modern, full-stack weather dashboard built with **React + TypeScript** (frontend) and **FastAPI + Python** (backend). Search for any city worldwide and view real-time weather conditions, hourly forecasts, and 7-day forecasts with beautiful, weather-responsive animations.

**Live Demo:** [meteoscope.vercel.app](https://meteoscope.vercel.app)

---

## 🎯 Features

- **🔍 City Search** – Debounced search with geocoding to find any city worldwide
- **🌡️ Real-time Weather** – Current temperature, weather conditions, and wind speed
- **📊 Forecast Data** – Hourly and 7-day weather forecasts
- **🎨 Dynamic Weather Theming** – UI adapts to current weather conditions
- **✨ Animated Weather Effects** – Visual effects matching weather (rain, clouds, snow, etc.)
- **⚡ Performance Optimized** – React Query caching, debounced search, memoized calculations
- **📱 Fully Responsive** – Desktop and mobile support with Tailwind CSS
- **🐳 Docker Ready** – Full containerization with Docker Compose

---

## 📦 Tech Stack

### Frontend
- **React 19** – Latest UI library with hooks
- **TypeScript 6.0** – Type-safe development
- **Vite 8** – Lightning-fast build tool with HMR
- **Tailwind CSS 4** – Utility-first styling
- **React Router 7** – Client-side routing
- **TanStack React Query 5** – Advanced data fetching and caching
- **Recharts 3** – Interactive chart visualizations
- **Axios** – HTTP client for API requests
- **Lucide React** – Beautiful icon library

### Backend
- **FastAPI 0.139** – Modern async Python web framework
- **Python 3.11** – Runtime (slim image for Docker)
- **Uvicorn 0.49** – ASGI application server
- **Pydantic 2.13** – Data validation and serialization
- **httpx 0.28** – Async HTTP client
- **python-dotenv 1.2** – Environment configuration

### External APIs
- **Open-Meteo Weather** – Free, real-time weather forecasts
- **Open-Meteo Geocoding** – City search and coordinate lookup

### DevOps
- **Docker** – Containerized deployment
- **Docker Compose** – Multi-container orchestration
- **Nginx** – Reverse proxy and static file serving

---

## 🗂️ Project Structure

```
meteoscope/
├── frontend/                   # React + TypeScript application
│   ├── src/
│   │   ├── App.tsx            # Main app component with search & state
│   │   ├── components/        # Reusable UI components
│   │   ├── hooks/             # Custom React hooks
│   │   ├── services/          # API client (Axios instance)
│   │   ├── theme/             # Weather theming utilities
│   │   ├── utils/             # Helper functions
│   │   ├── assets/            # Images and icons
│   │   ├── App.css            # Global styles
│   │   ├── index.css          # Base styles
│   │   └── main.tsx           # Entry point
│   ├── package.json           # Dependencies
│   ├── vite.config.ts         # Vite configuration
│   ├── tsconfig.json          # TypeScript configuration
│   ├── Dockerfile             # Container image
│   └── index.html             # HTML entry point
│
├── backend/                    # FastAPI server
│   ├── app/
│   │   ├── main.py            # FastAPI app setup, CORS, routes
│   │   └── services/          # Business logic
│   │       ├── weather.py     # Weather data fetching
│   │       └── geocoding.py   # City search & geocoding
│   ├── requirements.txt       # Python dependencies
│   ├── Dockerfile             # Container image
│   ├── .env                   # Environment variables
│   └── start-backend.bat         # Windows startup script
│
├── nginx/                      # Nginx configuration
├── docker-compose.yml         # Docker Compose configuration
└── README.md                  # This file
```

---

## 🚀 Quick Start

### Option 1: Docker Compose (Recommended)

```bash
git clone https://github.com/DanPec-cmd/meteoscope.git
cd meteoscope
docker-compose up --build
```

Then open:
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8000
- **API Docs:** http://localhost:8000/docs

### Option 2: Local Development

#### Backend Setup

```bash
cd backend
python -m venv .venv

# On Windows:
.venv\Scripts\activate

# On macOS/Linux:
source .venv/bin/activate

pip install -r requirements.txt
uvicorn app.main:app --reload
```

Backend runs on `http://localhost:8000`

#### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`

---

## 🔌 API Endpoints

### Get Weather Data
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
    "time": ["2026-07-05T00:00", ...],
    "temperature": [20.1, ...],
    "weathercode": [0, ...]
  },
  "daily": {
    "time": ["2026-07-05", ...],
    "temperature_2m_max": [25.0, ...],
    "temperature_2m_min": [18.0, ...],
    "weather_code": [0, ...]
  }
}
```

### Search Cities
```
GET /search?city={city_name}
```

**Response:**
```json
[
  {
    "name": "New York",
    "country": "United States",
    "lat": 40.7128,
    "lon": -74.0060
  },
  ...
]
```

---

## 📝 Development

### Frontend Scripts
```bash
npm run dev       # Start dev server with HMR
npm run build     # Build TypeScript + Vite bundle
npm run lint      # Run ESLint checks
npm run preview   # Preview production build locally
```

### Backend Scripts
```bash
uvicorn app.main:app --reload              # Run with auto-reload
python -m pip install -r requirements.txt  # Install dependencies
```

### Docker Commands
```bash
docker-compose up --build      # Build and start all services
docker-compose down            # Stop and remove containers
docker-compose logs -f         # View live logs
docker-compose ps              # List running containers
```

---

## 🎨 Key Components

### Frontend
- **App.tsx** – Main component managing search, state, and weather theme
- **HeroCard** – Displays current weather and forecast details
- **WeatherFX** – Renders animated weather effects
- **weatherTheme** – Utility returning colors/backgrounds based on weather conditions

### Backend
- **main.py** – FastAPI setup with CORS and route handlers
- **weather.py** – Fetches and formats weather data from Open-Meteo
- **geocoding.py** – Handles city search with error handling

---

## ⚙️ Configuration

### Environment Variables

**Backend (.env):**
```
OPEN_METEO_URL=https://api.open-meteo.com/v1/forecast
```

**Frontend:** Configured via Vite environment (uses `VITE_API_URL` if needed)

---

## 🧪 Testing & Quality

- **ESLint** – Code linting for consistent style
- **TypeScript** – Static type checking
- **Pydantic** – Backend data validation

---

## 📚 Resources

- [Open-Meteo API](https://open-meteo.com/)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [React 19 Docs](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite Guide](https://vitejs.dev/)
- [Docker Documentation](https://docs.docker.com/)

---

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs via [GitHub Issues](https://github.com/DanPec-cmd/meteoscope/issues)
- Suggest features
- Submit pull requests

---

## 📄 License

Open source project. Feel free to fork, modify, and use!

---

**Made with ❤️ for weather enthusiasts**
