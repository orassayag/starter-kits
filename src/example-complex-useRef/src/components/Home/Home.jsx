import { useContext } from 'react';
import Button from '../UI/Button/Button';
import Card from '../UI/Card/Card';
import AuthContext from '../../context/auth-context';
import classes from './Home.module.css';

const Home = () => {
  const ctx = useContext(AuthContext);
  return (
    <Card className={classes.home}>
      <h1>Welcome back!</h1>
      <Button
        onClick={ctx.onLogout}>
        Logout
        </Button>
    </Card>
  );
};

export default Home;