import { useState, useEffect } from 'react';

const useCounter = (isForwards) => {
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCounter((prevCounter) => isForwards ? prevCounter + 1 : prevCounter - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [isForwards]);
    return counter;
};

export default useCounter;