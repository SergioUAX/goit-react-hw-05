import styles from './SearchBar.module.css';

const SearchBar = ({ onSearchTopic }) => {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    const form = evt.target;    
    onSearchTopic(form.elements.topic.value.trim());
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

export default SearchBar;

