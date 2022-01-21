/* eslint-disable no-unused-vars */
import { React, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBreeds, getTemperaments } from "../../Redux/actions";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import Pagination from "../Pagination/Pagination";
import styles from "./Home.module.css";
import Loading from "../Loading/Loading";
import Navbar from "../Navbar/Navbar";

export default function Home() {
  const dispatch = useDispatch();
  const allBreeds = useSelector((state) => state.breeds);
  const allTemperaments = useSelector((state) => state.temperaments);
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
    dispatch(getTemperaments());
  }, [dispatch]);

  return (
    <div className={styles.homeContainer}>
      <div className={styles.navbar}>
        <Navbar setOrder={setOrder} fixedTop />
      </div>

      <div className={styles.pagination}>
        <Pagination
          breedsPerPage={breedsPerPage}
          allBreeds={allBreeds.length}
          pagination={pagination}
        />
      </div>

      <div className={styles.cards}>
        {currentBreeds.length === 0 && currentBreeds ? (
          <Loading />
        ) : (
          currentBreeds.map((e) => {
            return (
              <div key={e.id} className={styles.card}>
                <Link
                  to={"/dogs/" + e.id}
                  style={{ color: "inherit", textDecoration: "inherit" }}
                >
                  <Card
                    name={e.name}
                    image={e.image}
                    temperaments={e.temperaments}
                    weight_min={e.weight_min}
                    weight_max={e.weight_max}
                    key={e.id}
                  />
                </Link>
              </div>
            );
          })
        )}
      </div>

      <div className={styles.pagination}>
        <Pagination
          breedsPerPage={breedsPerPage}
          allBreeds={allBreeds.length}
          pagination={pagination}
        />
      </div>
    </div>
  );
}
