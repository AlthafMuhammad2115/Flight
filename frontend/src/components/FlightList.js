// src/components/FlightList.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { listFlights } from '../api';

const FlightList = () => {
  const [flights, setFlights] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await listFlights();
        setFlights(response.data);
      } catch (error) {
        console.error('Error fetching flights:', error);
      }
    };
    fetchFlights();
  }, []);

  const handleLogout = () => {
    // Clear any authentication state (local storage, state management, etc.)
    // For example, if you are using local storage to store the token:
    localStorage.removeItem('token'); // Adjust according to your auth implementation
    navigate('/'); // Redirect to home page
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="flex justify-end w-full p-4">
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      <h1 className="text-2xl mb-4">Available Flights</h1>
      <div className="overflow-x-auto w-full">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border">Flight Number</th>
              <th className="py-2 px-4 border">Departure Time</th>
              <th className="py-2 px-4 border">Arrival Time</th>
            </tr>
          </thead>
          <tbody>
            {flights.map((flight) => (
              <tr key={flight.id}>
                <td className="py-2 px-4 border">{flight.flightNumber}</td>
                <td className="py-2 px-4 border">{new Date(flight.departureTime).toLocaleString()}</td>
                <td className="py-2 px-4 border">{new Date(flight.arrivalTime).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FlightList;
