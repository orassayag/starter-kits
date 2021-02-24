import { useRef, useMemo, useLayoutEffect } from 'react';
import Form from 'react-bootstrap/Form';
import classNames from 'classnames';
import './List.css';

export default function List({ items, currentView, onToggleCurrentView }) {
  const isDetailedView = currentView === 'grid';

  // Helper function that allows finding first element in the view port.
  const findFirstElementInViewPort = elements =>
    Array.prototype.find.call(
      elements,
      element => element.getBoundingClientRect().y >= 85 // nav height offset.
    );

  // Ref to the container with elements
  const containerRef = useRef(null);

  const scrollTo = useMemo(() => {
    // Find all elements in container which will be checked if are in view or not.
    const nodeElements = containerRef.current?.querySelectorAll('[data-item]');
    if (nodeElements) {
      return findFirstElementInViewPort(nodeElements);
    }

    return undefined;
  }, []);

  useLayoutEffect(() => {
    if (scrollTo) {
      // Scroll to element with should be in view after rendering.
      scrollTo.scrollIntoView();
      // Scroll by height of nav.
      window.scrollBy(0, -85);
    }
  }, [scrollTo, currentView]);

  return (
    <div>
      <div className='fixed-nav'>
        <h3>Showing items as a {currentView}</h3>
        <Form.Check
          checked={isDetailedView}
          onChange={onToggleCurrentView}
          type='switch'
          id='show-details'
          label='Show details'
        />
      </div>

      <div
        className={classNames('list', { 'list-grid': isDetailedView })}
        ref={containerRef}
      >
        {items.map(item => (
          <div className='list-item' data-item='true' key={item.title}>
            {isDetailedView && (
              <img
                src={item.img}
                alt={item.title}
                className='list-item-image'
              />
            )}
            <h3>{item.title}</h3>
            {isDetailedView && (
              <p className='list-item-description'>{item.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}