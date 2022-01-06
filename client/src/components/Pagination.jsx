import React from "react";

export default function Pagination({ breedsPerPage, allBreeds, pagination }) {
  const pageNumbers = [];

  for (let i = 0; i <= Math.ceil(allBreeds / breedsPerPage); i++) {
    pageNumbers.push(i + 1);
  }

  return (
    <nav>
      <ul>
        {pageNumbers?.map((number) => {
          return (
            <li key={number}>
              <button onClick={() => pagination(number)}>{number}</button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
