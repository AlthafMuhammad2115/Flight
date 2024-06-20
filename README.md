## API Endpoints

### User Endpoints

#### Sign Up
- **Endpoint**: `POST https://flight-booking-mxjc.onrender.com/api/users/signup`
- **Request Body**:
  - `username` (String, required)
  - `email` (String, required)
  - `password` (String, required)

#### Login
- **Endpoint**: `POST https://flight-booking-mxjc.onrender.com/api/users/login`
- **Request Body**:
  - `email` (String, required)
  - `password` (String, required)

#### Search Flights
- **Endpoint**: `GET https://flight-booking-mxjc.onrender.com/api/users/search-flights`
- **Query Parameters**:
  - `date` (String, required, format: `YYYY-MM-DD`)
  - `time` (String, required, format: `HH:MM`)

#### Book Flight
- **Endpoint**: `POST https://flight-booking-mxjc.onrender.com/api/users/book-flight`
- **Request Body**:
  - `flightId` (String, required)
  - `userId` (String, required)

#### My Bookings
- **Endpoint**: `GET https://flight-booking-mxjc.onrender.com/api/users/my-bookings`
- **Query Parameters**:
  - `userId` (String, required)

#### Logout
- **Endpoint**: `POST https://flight-booking-mxjc.onrender.com/api/users/logout`
- **Request Body**:
  - `userId` (String, required)

### Admin Endpoints

#### Admin Login
- **Endpoint**: `POST https://flight-booking-mxjc.onrender.com/api/admin/login`
- **Request Body**:
  - `email` (String, required)
  - `password` (String, required)

#### Add Flight
- **Endpoint**: `POST https://flight-booking-mxjc.onrender.com/api/admin/add-flight`
- **Request Body**:
  - `flightNumber` (String, required)
  - `departureTime` (Date, required, format: `ISO 8601`)
  - `arrivalTime` (Date, required, format: `ISO 8601`)

#### Remove Flight
- **Endpoint**: `DELETE https://flight-booking-mxjc.onrender.com/api/admin/remove-flight/:id`
- **URL Parameter**:
  - `id` (String, required)

#### View Bookings
- **Endpoint**: `GET https://flight-booking-mxjc.onrender.com/api/admin/view-bookings`
- **Query Parameters**:
  - `flightId` (String, required)
  - `date` (String, required, format: `YYYY-MM-DD`)
