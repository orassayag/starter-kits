import { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import { Layout } from '../../hoc';

const App = () => {
  let socket = null;
  const [message, setMessage] = useState('');

  useEffect(() => {
    socket = socketIOClient('http://localhost:3001/');
    socket.on('message', (data) => {
      setMessage(`${data.parameter1} ${data.parameter2} ${data.parameter3}`);
    });
    return () => {
      socket.emit('terminate', { socketId: socket.id });
    };
  }, []);
  return (
    <Layout>
      {message}
    </Layout>
  );
};

export default App;