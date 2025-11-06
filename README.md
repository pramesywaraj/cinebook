# CineBook - Cinema Booking System

A modern, full-featured cinema booking application built with Astro, React, and TypeScript. CineBook provides a seamless experience for customers to browse studios, book seats, and manage their bookings, while offering comprehensive admin tools for ticket validation and box office management.

## 🎬 Features

### Customer Features

- **User Authentication**: Secure registration and login system
- **Studio Browser**: Browse available cinema studios with search functionality
- **Interactive Seat Selection**: Visual seat map with real-time availability
- **Online Booking**: Book seats with instant confirmation
- **Booking Management**: View booking history and details
- **QR Code Tickets**: Generate and view QR codes for bookings
- **Profile Management**: View and manage user profile

### Admin Features

- **Admin Dashboard**: Centralized admin panel
- **Box Office Booking**: Create offline bookings for walk-in customers
- **QR Code Validation**: Scan and validate tickets using device camera
- **Ticket Management**: View and manage all bookings
- **User Management**: Admin access control

## 🛠️ Tech Stack

- **Framework**: [Astro](https://astro.build) 5.15.3
- **UI Library**: React 19.2.0
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.1.16
- **UI Components**: Radix UI
- **Form Handling**: React Hook Form + Zod
- **Icons**: Lucide React
- **QR Code**: html5-qrcode
- **Date Handling**: Day.js
- **Package Manager**: pnpm
- **Deployment**: Docker + Docker Compose

## 🏗️ Backend System

This frontend application connects to a microservice-based backend API. The backend repository is available at:

**Backend Repository**: [https://github.com/gcode/cinema-booking](https://github.com/gcode/cinema-booking)

### Backend Architecture

The backend consists of 4 microservices built with Go and Gin framework:

1. **Auth Service** (Port 3001): Handles user authentication and JWT tokens
2. **Cinema Service** (Port 3002): Manages studios and seats
3. **Booking Service** (Port 3003): Handles ticket booking and QR code generation
4. **API Gateway** (Port 3000): Routes requests and provides API documentation

### Backend Setup

Before running the frontend, you need to set up and run the backend services:

1. **Clone the backend repository**

    ```bash
    git clone https://github.com/gcode/cinema-booking.git
    cd cinema-booking
    ```

2. **Start all backend services**

    ```bash
    docker-compose up --build
    ```

3. **Verify backend is running**
    - API Gateway: http://localhost:3000
    - Swagger UI Documentation: http://localhost:3000/api/docs
    - Health Checks:
        - Auth Service: http://localhost:3001/health
        - Cinema Service: http://localhost:3002/health
        - Booking Service: http://localhost:3003/health
        - API Gateway: http://localhost:3000/health

4. **Configure frontend to connect to backend**
    ```env
    PUBLIC_API_BASE_URL=http://localhost:3000/api
    ```

For detailed backend setup instructions, see the [backend repository](https://github.com/gcode/cinema-booking).

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 20 or higher
- **pnpm**: Version 8 or higher (install via `npm install -g pnpm` or `corepack enable`)
- **Docker**: Version 20.10 or higher (for containerized deployment)
- **Docker Compose**: Version 2.0 or higher
- **Backend API**: The backend microservices must be running (see [Backend System](#-backend-system) section)

### Backend Prerequisites

The backend requires:

- Docker and Docker Compose
- PostgreSQL (handled by Docker Compose)
- Go 1.21+ (for local development)

See the [backend repository](https://github.com/gcode/cinema-booking) for complete setup instructions.

## 🚀 Installation

### Step 1: Backend Setup

1. **Clone and start the backend services**

    ```bash
    git clone https://github.com/gcode/cinema-booking.git
    cd cinema-booking
    docker-compose up --build
    ```

2. **Verify backend is accessible**
    - Open http://localhost:3000/api/docs in your browser to view Swagger documentation
    - Ensure all services are healthy (check health endpoints listed above)

### Step 2: Frontend Setup

1. **Clone the frontend repository**

    ```bash
    git clone <repository-url>
    cd cinebook
    ```

2. **Install dependencies**

    ```bash
    pnpm install
    ```

3. **Create environment file**

    ```bash
    cp .env.example .env
    ```

    Or create a `.env` file with the following content:

    ```env
    PUBLIC_API_BASE_URL=http://localhost:3000/api
    ```

4. **Update environment variables**
   Edit `.env` and set your API base URL (default should work if backend is on localhost:3000):

    ```env
    PUBLIC_API_BASE_URL=http://localhost:3000/api
    ```

5. **Start development server**

    ```bash
    pnpm dev
    ```

    The application will be available at `http://localhost:8500`

## 🔧 Development

### Available Scripts

- `pnpm dev` - Start development server (port 8500)
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build locally
- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Fix ESLint errors
- `pnpm format` - Format code with Prettier
- `pnpm format:check` - Check code formatting

### Project Structure

cinebook/
├── src/
│ ├── components/ # React components
│ │ ├── admin/ # Admin-specific components
│ │ ├── app/ # Customer-facing components
│ │ └── ui/ # Reusable UI components
│ ├── layouts/ # Astro layouts
│ │ ├── admin.astro # Admin layout
│ │ └── app.astro # Customer app layout
│ ├── lib/ # Utilities and business logic
│ │ ├── api/ # API client functions
│ │ ├── hooks/ # React hooks
│ │ ├── schemas/ # Zod schemas
│ │ └── constants/ # Constants and configuration
│ ├── pages/ # Astro pages (routes)
│ │ ├── admin/ # Admin pages
│ │ ├── booking/ # Booking pages
│ │ └── studio/ # Studio pages
│ └── styles/ # Global styles
├── public/ # Static assets
├── dist/ # Build output (generated)
├── Dockerfile # Docker image configuration
├── docker-compose.yaml # Docker Compose configuration
├── astro.config.mjs # Astro configuration
├── package.json # Dependencies and scripts
└── tsconfig.json # TypeScript configuration

### Environment Variables

The application requires the following environment variable:

| Variable              | Description                 | Required | Default |
| --------------------- | --------------------------- | -------- | ------- |
| `PUBLIC_API_BASE_URL` | Base URL of the backend API | Yes      | -       |

Example:

```env
PUBLIC_API_BASE_URL=http://localhost:3000/api
```

## 🏗️ Building for Production

1. **Set environment variable**

    ```bash
    export PUBLIC_API_BASE_URL=http://your-api-url:port/api
    ```

2. **Build the application**

    ```bash
    pnpm build
    ```

3. **Preview the production build**
    ```bash
    pnpm preview
    ```

The build output will be in the `dist/` directory.

## 🐳 Docker Deployment

### Prerequisites for Docker

- Docker and Docker Compose installed
- Backend API server running and accessible
- `.env` file with `PUBLIC_API_BASE_URL` configured

### Full Stack Deployment

To deploy both frontend and backend together:

1. **Start the backend services**

    ```bash
    cd cinema-booking  # Backend repository
    docker-compose up -d
    ```

2. **Deploy the frontend**
    ```bash
    cd cinebook  # Frontend repository
    docker-compose up --build
    ```

### Frontend Docker Deployment

If the backend is already running, you can deploy just the frontend:

1. **Create `.env` file**

    ```bash
    echo "PUBLIC_API_BASE_URL=http://your-backend-gateway:3000/api" > .env
    ```

2. **Build and run with Docker Compose**

    ```bash
    docker-compose up --build
    ```

    The application will be available at `http://localhost:8500`

3. **Run in detached mode (background)**

    ```bash
    docker-compose up -d --build
    ```

4. **View logs**

    ```bash
    docker-compose logs -f web
    ```

5. **Stop the container**
    ```bash
    docker-compose down
    ```

### Docker Build Options

#### Using Docker Compose (Recommended)

The `docker-compose.yaml` file handles:

- Building the Docker image
- Setting environment variables
- Port mapping (8500:4321)
- Container restart policy

**Configuration:**

- Host port: `8500`
- Container port: `4321`
- Build args: `PUBLIC_API_BASE_URL` (from `.env` or environment)

#### Manual Docker Build

1. **Build the image**

    ```bash
    docker build \
      --build-arg PUBLIC_API_BASE_URL=http://your-api-url:port/api \
      -t cinebook:latest \
      .
    ```

2. **Run the container**

    ```bash
    docker run -d \
      --name cinebook \
      -p 8500:4321 \
      -e PUBLIC_API_BASE_URL=http://your-api-url:port/api \
      -e NODE_ENV=production \
      -e PORT=4321 \
      -e HOST=0.0.0.0 \
      --restart unless-stopped \
      cinebook:latest
    ```

3. **View logs**
    ```bash
    docker logs -f cinebook
    ```

### Network Configuration

If running backend and frontend in separate Docker containers, ensure they can communicate:

- **Same Docker network**: Use Docker networks to connect containers
- **Host network**: Use `host.docker.internal` to access host services
- **Service discovery**: Use service names in docker-compose

Example `.env` for Docker deployment:

```env
# If backend is on host machine
PUBLIC_API_BASE_URL=http://host.docker.internal:3000/api

# If backend is in same Docker network
PUBLIC_API_BASE_URL=http://api-gateway:3000/api
```

### Docker Troubleshooting

#### Container won't start

```bash
# Check container logs
docker-compose logs web

# Check if container is running
docker-compose ps

# Rebuild from scratch
docker-compose build --no-cache
docker-compose up
```

#### Port already in use

If port 8500 is already in use, modify `docker-compose.yaml`:

```yaml
ports:
    - '8080:4321' # Use port 8080 instead
```

#### Environment variable issues

Ensure `.env` file exists and contains:

```env
PUBLIC_API_BASE_URL=http://your-api-url:port/api
```

## 📡 API Endpoints

The application communicates with the backend API through the API Gateway (port 3000). All requests are prefixed with `/api`.

**API Documentation**: http://localhost:3000/api/docs (Swagger UI)

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/verify` - Verify JWT token

### Cinema Management

- `GET /api/cinema/studios` - Get all studios
- `GET /api/cinema/studios/:id/seats` - Get studio seats

### Booking

- `POST /api/booking/online` - Create online booking (requires authentication)
- `POST /api/booking/offline` - Create offline booking (admin/cashier)
- `GET /api/booking/my-bookings` - Get user's booking history (requires authentication)
- `POST /api/booking/validate` - Validate QR code (admin)

### API Usage Examples

See the [backend repository](https://github.com/gcode/cinema-booking) for detailed API examples and curl commands.

## 🔐 Authentication & Authorization

- **Route Protection**: Automatic route guarding based on authentication status
- **Admin Routes**: Protected routes requiring admin role (`/admin/*`)
- **User Routes**: Protected routes requiring authentication
- **Unprotected Routes**: Public routes (`/login`, `/register`)

### User Roles

- **Customer**: Can browse studios, book seats, view bookings
- **Admin**: Full access including admin dashboard, box office, and ticket validation

## 🎨 UI Components

The application uses a custom component library built on:

- **Radix UI**: Accessible, unstyled components
- **Tailwind CSS**: Utility-first styling
- **Custom Design System**: Consistent theming and components

Key components:

- Buttons, Cards, Dialogs, Forms, Inputs, Badges, Spinners
- Navigation components (BottomNav, Navbar)
- Booking components (SeatMap, BookingList, BookingDetail)
- Admin components (AdminBooking, QRScanner, ValidateQR)

## 🧪 Development Workflow

1. **Create a feature branch**

    ```bash
    git checkout -b feature/your-feature-name
    ```

2. **Make changes and test locally**

    ```bash
    pnpm dev
    ```

3. **Lint and format code**

    ```bash
    pnpm lint:fix
    pnpm format
    ```

4. **Build and test production build**

    ```bash
    pnpm build
    pnpm preview
    ```

5. **Commit and push changes**
    ```bash
    git add .
    git commit -m "feat: your feature description"
    git push origin feature/your-feature-name
    ```

## 📱 Mobile Responsive

The application is designed with mobile-first approach:

- Optimized for mobile devices
- Responsive layouts for desktop
- Touch-friendly interactions
- Bottom navigation for easy access

## 🔍 QR Code Scanning

The admin validation feature uses device camera for QR code scanning:

- Real-time QR code detection
- Automatic booking validation
- Error handling for invalid codes
- Mobile and desktop camera support

**Note**: Camera permissions are required for QR code scanning functionality.

## 🐛 Troubleshooting

### Build Errors

- **Missing environment variable**: Ensure `PUBLIC_API_BASE_URL` is set
- **Type errors**: Run `pnpm build` to check TypeScript errors
- **Dependency issues**: Delete `node_modules` and `pnpm-lock.yaml`, then `pnpm install`

### Runtime Errors

- **API connection failed**: Verify `PUBLIC_API_BASE_URL` is correct and API server is running
- **Authentication issues**: Clear localStorage and re-login
- **QR scanner not working**: Check camera permissions in browser settings

### Docker Issues

- **Container exits immediately**: Check logs with `docker-compose logs web`
- **Port conflicts**: Change port mapping in `docker-compose.yaml`
- **Build fails**: Ensure all dependencies are listed in `package.json`

### Backend Connection Issues

- **Cannot connect to API**: Ensure backend services are running
- **404 errors**: Verify API Gateway is accessible at http://localhost:3000
- **CORS errors**: Check backend CORS configuration
- **Authentication failing**: Verify JWT token is being sent in headers

## 📚 Additional Resources

- **Backend Repository**: [https://github.com/gcode/cinema-booking](https://github.com/gcode/cinema-booking)
- **API Documentation**: http://localhost:3000/api/docs (when backend is running)
- **Astro Documentation**: https://docs.astro.build
- **React Documentation**: https://react.dev

## 👥 Authors

[craftedbyprames.dev](https://craftedbyprames.dev)

## 🙏 Acknowledgments

- Astro team for the amazing framework
- Radix UI for accessible components
- All contributors and open-source libraries used

---

**Important**: This frontend application requires the backend API server to be running. Make sure to:

1. Clone and start the [backend services](https://github.com/gcode/cinema-booking) first
2. Configure `PUBLIC_API_BASE_URL` to point to your backend API Gateway (default: http://localhost:3000/api)
3. Verify backend health endpoints are responding before starting the frontend
