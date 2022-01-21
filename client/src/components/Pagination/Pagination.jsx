import React from "react";
import styles from "./Pagination.module.css";

export default function Pagination({ breedsPerPage, allBreeds, pagination }) {
  const pageNumbers = [];

  for (let i = 0; i < Math.ceil(allBreeds / breedsPerPage); i++) {
    pageNumbers.push(i + 1);
  }

  return (
    <nav>
      <ul className={styles.pagination}>
        {pageNumbers.length > 1 &&
          pageNumbers.map((number) => {
            return (
              <li key={number}>
                <button onClick={() => pagination(number)}>
                  <strong>{number}</strong>
                </button>
              </li>
            );
          })}
      </ul>
    </nav>
  );
}
