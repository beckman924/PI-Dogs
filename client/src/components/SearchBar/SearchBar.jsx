import { React, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getNameBreeds, getBreeds } from "../../Redux/actions";

import styles from "./SearchBar.module.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  useEffect(() => {
    dispatch(getBreeds());
  }, [dispatch]);

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getNameBreeds(name));
    setName("");
  }

  return (
    <div className={styles.search__container}>
      <input
        type="text"
        placeholder=" "
        onChange={(e) => handleInputChange(e)}
        onInput={(e) => handleSubmit(e)}
        className={styles.input}
      />
      <label className={styles.search__label}>Search Breed... 🔍</label>
    </div>
  );
}
