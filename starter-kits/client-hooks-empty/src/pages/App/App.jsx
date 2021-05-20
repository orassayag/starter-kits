import { useState, useEffect } from 'react';
import { Layout } from '../../hoc';

const App = () => {
  const [text, setText] = useState(null);
  useEffect(() => {
    setText('Hello world');
  }, []);
  return (
    <Layout>
      {text}
    </Layout>
  );
};

export default App;