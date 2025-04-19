import styles from './NotFoundPage.module.css';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import default_img from '../../images/default_img.jpg';

const NotFoundPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/", { replace: true });
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
        <div className={styles.notfoundpage}>
      <h2>Page not found! Redirecting to Home Page in 3 seconds ...</h2>
      <img src={ default_img} alt="RWGFY" />
        </div>
    );
};

export default NotFoundPage;
