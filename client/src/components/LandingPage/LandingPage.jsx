import React from "react";
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";
import { GiDogHouse } from "react-icons/gi";

export default function LandingPage() {
  return (
    <div className={styles.landing__container}>
      <h1 className={styles.landing__container__title}>Dogs PI</h1>

      <Link to="/dogs">
        <button className={styles.landing__container__button}>
          <h1>
            <span>
              Enter! <GiDogHouse />
            </span>
          </h1>
        </button>
      </Link>
    </div>
  );
}
