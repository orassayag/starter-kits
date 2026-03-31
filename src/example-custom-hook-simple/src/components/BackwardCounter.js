import Card from './Card';
import useCounter from '../hooks/useCounter/useCounter';

const BackwardCounter = () => {
  const counter = useCounter(false);

  return (
    <Card>
      {counter}
    </Card>);
};

export default BackwardCounter;