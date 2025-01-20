import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './index.css';

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

  // const fetchEvents = async (token) => {
  //   try {
  //     const response = await axios.get('http://localhost:5000/events', {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     setEvents(response.data);
  //   } catch (error) {
  //     console.error('Error fetching events:', error);
  //   }
  // };

  const fetchEvents = async (token) => {
    try {
      const response = await axios.get('http://localhost:5000/events', {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      // Sort events by start date in descending order
      const sortedEvents = response.data.sort((a, b) => {
        const dateA = new Date(a.start.dateTime || a.start.date);
        const dateB = new Date(b.start.dateTime || b.start.date);
        return dateB - dateA; // Sort by newest first
      });
  
      setEvents(sortedEvents);
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

//   return (
//     <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
//       {!token ? (
//         <button onClick={loginWithGoogle} style={{ padding: '10px 20px', fontSize: '16px' }}>
//           Login with Google
//         </button>
//       ) : (
//         <>
//           <h2>Your Events</h2>
//           <div>
//             <label htmlFor="date-filter" style={{ marginRight: '10px' }}>Filter by Date:</label>
//             <input
//               type="date"
//               id="date-filter"
//               value={filterDate}
//               onChange={(e) => setFilterDate(e.target.value)}
//               style={{ marginBottom: '20px', padding: '5px' }}
//             />
//           </div>
//           <table border="1" style={{ width: '100%', textAlign: 'left' }}>
//             <thead>
//               <tr>
//                 <th>Event Name</th>
//                 <th>Date</th>
//                 <th>Time</th>
//                 <th>Location</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredEvents.map((event) => (
//                 <tr key={event.id}>
//                   <td>{event.summary}</td>
//                   <td>{new Date(event.start.dateTime || event.start.date).toLocaleDateString()}</td>
//                   <td>{new Date(event.start.dateTime || event.start.date).toLocaleTimeString()}</td>
//                   <td>{event.location || 'Virtual'}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </>
//       )}
//     </div>
//   );
// };

return (
  <div className="bg-gradient-to-r from-blue-500 to-indigo-600 min-h-screen text-white font-sans">
    <header className="text-center py-10">
      <h1 className="text-4xl font-bold mb-4">Event Fetcher</h1>
      <p className="text-lg">Seamlessly manage your events with Google Calendar</p>
    </header>

    {!token ? (
      <div className="flex justify-center mt-10">
        <button
          onClick={loginWithGoogle}
          className="px-6 py-3 bg-white text-blue-600 font-bold rounded-md shadow-md hover:bg-blue-100 transition"
        >
          Login with Google
        </button>
      </div>
    ) : (
      <div className="max-w-4xl mx-auto mt-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Your Events</h2>
          <div>
            <label htmlFor="date-filter" className="mr-2">
              Filter by Date:
            </label>
            <input
              type="date"
              id="date-filter"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="p-2 rounded bg-gray-100 text-black"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="p-4 bg-white text-black rounded-lg shadow-md"
            >
              <h3 className="text-xl font-bold">{event.summary}</h3>
              <p>
                <strong>Date:</strong>{' '}
                {new Date(event.start.dateTime || event.start.date).toLocaleDateString()}
              </p>
              <p>
                <strong>Time:</strong>{' '}
                {new Date(event.start.dateTime || event.start.date).toLocaleTimeString()}
              </p>
              <p>
                <strong>Location:</strong> {event.location || 'Virtual'}
              </p>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);
};

export default App;
