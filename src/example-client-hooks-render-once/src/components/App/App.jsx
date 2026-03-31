import { useState, useEffect, useCallback } from 'react';
import ListItem from '../ListItem/ListItem';

const app = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/comments')
      .then(response => response.json())
      .then(setComments);
  }, []);

  const type = 'UPDATE'; // ADD / UPDATE / REMOVE.
  const handleClick = useCallback(id => {
    switch (type) {
      case 'ADD': {
        // ADD.
        setComments(comments => {
          return [...comments, { id: comments.length + 1, name: 'test' }];
        });
        break;
      }
      case 'UPDATE': {
        // UPDATE.
        setComments(comments => {
          return [...comments, comments[1] = { id: Math.random(), name: 'test' }];
        });
        break;
      }
      case 'REMOVE': {
        // REMOVE.
        setComments(comments => comments.filter(c => c.id !== id));
        break;
      }
    }
  }, []);

  return (
    <ul>
      {comments.map((item, i) => {
        return <ListItem {...item} index={i} key={item.id} onClick={handleClick} />;
      })}
    </ul>
  );
};

export default app;