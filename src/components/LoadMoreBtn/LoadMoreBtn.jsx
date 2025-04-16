import styles from './LoadMoreBtn.module.css';

const LoadMoreBtn = ({ onLoadMore }) => {
  const handleOnClick = (evt) => {
        evt.preventDefault(); 
        onLoadMore();  
  };

    return (
        <div className={ styles.loadmorebtn}>
            <button onClick={handleOnClick}>Load more</button>
        </div>
  );
};

export default LoadMoreBtn;