import { React, useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getBreeds,
  filterBreedsByBreed,
  filterCreated,
  orderByName,
} from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Pagination from "./Pagination";

export default function Home() {
  const dispatch = useDispatch();
  const allBreeds = useSelector((state) => state.breeds);
  const [order, setOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [breedsPerPage, setBreedsPerPage] = useState(8);
  const indexOfLastBreed = currentPage * breedsPerPage;
  const indexOfFirstBreed = indexOfLastBreed - breedsPerPage;
  const currentBreeds = allBreeds.slice(indexOfFirstBreed, indexOfLastBreed);

  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getBreeds());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getBreeds);
  }

  function handleSort(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordered ${e.target.value}`);
  }

  function handleFilterStatus(e) {
    dispatch(filterBreedsByBreed(e.target.value));
  }

  function handleFilterCreated(e) {
    dispatch(filterCreated(e.target.value));
  }

  return (
    <div>
      <Link to="breed">Create Breed</Link>
      <h1>Dogs PI</h1>
      <button
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Reload all breeds
      </button>
      <div>
        <select onChange={(e) => handleFilterCreated(e)} name="" id="">
          <option value="existent">Existent Breed</option>
          <option value="created">Breed Created</option>
        </select>
        <select onChange={(e) => handleSort(e)} name="" id="">
          <option value="asc">Ascendent</option>
          <option value="des">Descendent</option>
        </select>
        <select onChange={(e) => handleFilterStatus(e)} name="" id="">
          <option value="all">All</option>
          <option value="temperament">Temperament</option>
          <option value="min_weight">Min Weight</option>
          <option value="max_weight">Max Weight</option>
        </select>
        <select name="" id="">
          <option value="all">All</option>
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
        </select>

        <Pagination
          breedsPerPage={breedsPerPage}
          allBreeds={allBreeds.length}
          pagination={pagination}
        />

        {currentBreeds?.map((e) => {
          return (
            <Fragment>
              {/* <Link to={"/home" + e.id}> */}
              <Card
                name={e.name}
                image={e.image}
                temperament={e.temperament}
                weight_min={e.weight_min}
                weight_max={e.weight_max}
                key={e.id}
              />
              {/* </Link> */}
            </Fragment>
          );
        })}

        <Pagination
          breedsPerPage={breedsPerPage}
          allBreeds={allBreeds.length}
          pagination={pagination}
        />
      </div>
    </div>
  );
}
