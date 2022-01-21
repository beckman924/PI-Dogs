import React from "react";
import { Link } from "react-router-dom";
import styles from "./Loading.module.css";

export default function Loading() {
  return (
    <div className={styles.body}>
      <div className={styles.loading_container}>
        <h1>Loading Breeds!</h1>
        <Link to="/">
          <button className={styles.loading__container_button}>
            <span>
              <strong>If it takes too much time to load click me!</strong>
            </span>
          </button>
        </Link>
        <img
          className={styles.loading__container_loading_image}
          src="https://cdn.dribbble.com/users/1142616/screenshots/5310753/loading-dog.gif"
          alt=""
        />
      </div>
    </div>
  );
}
