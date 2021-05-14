import Card from './Card';
import useCounter from '../hooks/useCounter/useCounter';

const ForwardCounter = () => {
  const counter = useCounter(true);

  return (
    <Card>
      {counter}
    </Card>);
};

export default ForwardCounter;