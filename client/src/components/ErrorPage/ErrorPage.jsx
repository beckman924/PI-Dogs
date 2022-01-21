import React from "react";
import { Link } from "react-router-dom";
import styles from "./ErrorPage.module.css";
import { GiDogHouse } from "react-icons/gi";

export default function ErrorPage() {
  return (
    <div className={styles.divErr}>
      <Link to={"/dogs"}>
        <button className={styles.button}>
          <h1>
            <span>
              Take me back to home! <GiDogHouse />
            </span>
          </h1>
        </button>
      </Link>
    </div>
  );
}
