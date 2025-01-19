import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [events, setEvents] = useState([]);
  const [token, setToken] = useState('');
  const [filterDate, setFilterDate] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    if (token) {
      setToken(token);
      fetchEvents(token);
    }
  }, []);

  const fetchEvents = async (token) => {
    try {
      const response = await axios.get('http://localhost:5000/events', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const loginWithGoogle = () => {
    window.location.href = 'http://localhost:5000/auth';
  };

  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.start.dateTime || event.start.date).toISOString().split('T')[0];
    return filterDate ? eventDate === filterDate : true;
  });

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      {!token ? (
        <button onClick={loginWithGoogle} style={{ padding: '10px 20px', fontSize: '16px' }}>
          Login with Google
        </button>
      ) : (
        <>
          <h2>Your Events</h2>
          <div>
            <label htmlFor="date-filter" style={{ marginRight: '10px' }}>Filter by Date:</label>
            <input
              type="date"
              id="date-filter"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              style={{ marginBottom: '20px', padding: '5px' }}
            />
          </div>
          <table border="1" style={{ width: '100%', textAlign: 'left' }}>
            <thead>
              <tr>
                <th>Event Name</th>
                <th>Date</th>
                <th>Time</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {filteredEvents.map((event) => (
                <tr key={event.id}>
                  <td>{event.summary}</td>
                  <td>{new Date(event.start.dateTime || event.start.date).toLocaleDateString()}</td>
                  <td>{new Date(event.start.dateTime || event.start.date).toLocaleTimeString()}</td>
                  <td>{event.location || 'Virtual'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default App;
