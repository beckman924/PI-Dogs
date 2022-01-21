/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import { GiSittingDog, GiDogHouse } from "react-icons/gi";
import { IoReload } from "react-icons/io5";
import styles from "./Navbar.module.css";
import ReorderIcon from "@material-ui/icons/Reorder";
import {
  getBreeds,
  filterBreedsByTemperament,
  filterCreated,
  sortByName,
  getTemperaments,
  sortByWeight,
  resetBreedState,
} from "../../Redux/actions";

function Navbar({ setOrder }) {
  const dispatch = useDispatch();
  const allBreeds = useSelector((state) => state.breeds);
  const allTemperaments = useSelector((state) => state.temperaments);

  useEffect(() => {
    dispatch(getBreeds());
    dispatch(getTemperaments());
  }, [dispatch]);

  const [showItems, setShowItems] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  function handleClickClearFilters(e) {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(getBreeds());
  }

  function handleSortByName(e) {
    e.preventDefault();
    dispatch(sortByName(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordered ${e.target.value}`);
  }

  function handleFilterTemperament(e) {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(filterBreedsByTemperament(e.target.value));
  }

  function handleFilterCreated(e) {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(filterCreated(e.target.value));
  }

  function handleSortByWeight(e) {
    e.preventDefault();
    dispatch(sortByWeight(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordered ${e.target.value}`);
  }

  return (
    <div className={styles.Navbar}>
      <div className={styles.leftSide}>
        <div className={styles.items} id={showItems ? styles.hidden : ""}>
          <button
            onClick={(e) => {
              handleClickClearFilters(e);
            }}
          >
            Clear Filters <IoReload />
          </button>

          <Link to="/dog">
            <button>
              Create Breed <GiSittingDog />
            </button>
          </Link>

          <select
            onChange={(e) => handleFilterCreated(e)}
            name="filterApiAndDb"
            id=""
          >
            <option value="default" hidden>
              Sort by...
            </option>
            <option value="all">All</option>
            <option value="existent">Existent Breed</option>
            <option value="created">Breed Created</option>
          </select>

          <select
            onChange={(e) => handleSortByWeight(e)}
            name="sortByWeight"
            id=""
          >
            <option value="default" hidden>
              Sort by Weight
            </option>
            <option value="max_weight">Max Weight</option>
            <option value="min_weight">Min Weight</option>
          </select>

          <select
            onChange={(e) => handleFilterTemperament(e)}
            name="filterTemperament"
            id="temperamentsSelect"
          >
            <option value="default" hidden>
              Sort by Temperament
            </option>
            <option key={0} value="all">
              All
            </option>
            {allTemperaments
              ?.sort(function (a, b) {
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
                return 0;
              })
              .map((e) => {
                return (
                  <option key={e.id} value={e.name}>
                    {e.name}
                  </option>
                );
              })}
          </select>

          <select onChange={(e) => handleSortByName(e)} name="filterSort" id="">
            <option value="default" hidden>
              Sort by Name
            </option>
            <option value="asc">Ascendent</option>
            <option value="des">Descendent</option>
          </select>
        </div>

        <button
          className={styles.dropbar}
          onClick={() => setShowItems(!showItems)}
        >
          <ReorderIcon />
        </button>
      </div>

      <div className={styles.rightSide}>
        <SearchBar />

        <Link to="/">
          <button>
            Return to Welcome Page <GiDogHouse />
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
