import React, { useState, useEffect, useCallback } from 'react';
import ListItem from '../ListItem/ListItem';

const app = (props) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/comments')
      .then(response => response.json())
      .then(setComments);
  }, []);

  const handleClick = useCallback(id => {
    // ADD
    /*
        setComments(comments => {
          return [...comments, { id: comments.length + 1, name: 'test' }];
        });
    */

    // UPDATE
    /*
        setComments(comments => {
          return [...comments, comments[1] = { id: Math.random(), name: 'test' }];
        });
    */

    // REMOVE
    /* setComments(comments => comments.filter(c => c.id !== id)); */
  }, []);

  return (
    <ul>
      {comments.map((item, i) => {
        return <ListItem {...item} key={item.id} onClick={handleClick} />;
      })}
    </ul>
  );
};

export default app;