import styles from './SearchBar.module.css';

export const SearchBar = ({ onSearch }) => {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    const form = evt.target;
	  const topic = form.elements.topic.value;
    onSearch(topic);
    form.reset();
  };

  return (
      <form onSubmit={handleSubmit} className={styles.searchbar}>
        <div>
            <input
                type="text"
                name="topic"
                autoComplete="off"
                autoFocus
                placeholder="Search movies"
            />
            <button type="submit">Search</button>
        </div>
      </form>
  );
};
