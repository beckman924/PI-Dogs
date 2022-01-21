import React from "react";
import styles from "./Card.module.css";

export default function Card({
  name,
  image,
  temperaments,
  weight_min,
  weight_max,
}) {
  return (
    <div className={styles.card}>
      <img
        src={
          image
            ? image
            : "https://i.pinimg.com/originals/f1/92/15/f192157054725939f5bb0e892a573f84.png"
        }
        alt="img not found 😞"
        className={styles.card__image}
        width="200"
        height="200"
      />

      <div className={styles.card__text}>
        <h2>{name}</h2>

        <div className={styles.card__tempContainer}>
          <h4>Temperaments : </h4>
          <p>
            {temperaments
              ? (function (temperaments) {
                  if (typeof temperaments === "string") {
                    return temperaments;
                  }
                  if (Array.isArray(temperaments)) {
                    let temps = temperaments.map((e) => e.name);
                    return temps.join(", ");
                  }
                })(temperaments)
              : "🤷‍♂️ No temperaments provided for this breed 🤷‍♀️"}
          </p>
        </div>
      </div>

      <div className={styles.card__weights}>
        <div className={styles.weight}>
          <div className="value">Weights</div>
        </div>

        <div className={styles.weight_border}>
          <div className="value">
            {weight_min ? weight_min : NaN}
            <sup> kg</sup>
          </div>
          <div className="type">MIN</div>
        </div>

        <div className={styles.weight}>
          <div className="value">
            {weight_max ? weight_max : NaN} <sup>kg</sup>
          </div>
          <div className="type">MAX</div>
        </div>
      </div>
    </div>
  );
}
