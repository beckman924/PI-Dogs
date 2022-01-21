/* eslint-disable no-unused-vars */
import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail, resetState } from "../../Redux/actions";
import { useEffect } from "react";
import styles from "./Detail.module.css";
import Loading from "../Loading/Loading";

function Detail() {
  const { id } = useParams();
  const myBreed = useSelector((state) => state.detail);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetail(id));
    dispatch(resetState("reset"));
  }, [dispatch, id]);

  return (
    <div className={styles.body}>
      <div>
        <Link to="/dogs">
          <button className={styles.homeButton} onClick={resetState}>
            Take me back to home 🏡
          </button>
        </Link>
      </div>
      <main className={styles.main}>
        <div className={styles.container}>
          {myBreed.length > 0 ? (
            <div className={styles.content_info}>
              <div className={styles.content_image}>
                <img
                  src={
                    myBreed[0].image
                      ? myBreed[0].image
                      : "https://i.pinimg.com/originals/f1/92/15/f192157054725939f5bb0e892a573f84.png"
                  }
                  alt="img not found 😞"
                />
              </div>

              <h1 className={styles.content_name}>{myBreed[0].name}</h1>
              <h2>Life Span: {myBreed[0].life_span}</h2>
              <h4>Height: </h4>
              <p>
                {myBreed[0].height_min} - {myBreed[0].height_max} CM
              </p>
              <h4>Weight: </h4>
              <p>
                {myBreed[0].weight_min
                  ? myBreed[0].weight_min
                  : "No minimum weight provided for this breed "}{" "}
                -{" "}
                {myBreed[0].weight_max
                  ? `${myBreed[0].weight_max} KG`
                  : "No maximum weight provided for this breed ⚖"}
              </p>

              <h4>Temperaments: </h4>
              <ul style={{ listStyle: "none" }}>
                {myBreed[0].createdInDb
                  ? myBreed[0].temperaments.map((e) => {
                      return (
                        <li key={e.id}>
                          <label>{e.name}</label>
                        </li>
                      );
                    })
                  : myBreed[0].temperaments
                  ? myBreed[0].temperaments.split(", ").map((e) => {
                      return (
                        <li key={e}>
                          <label>{e}</label>
                        </li>
                      );
                    })
                  : "🤷‍♂️ No temperaments provided for this breed 🤷‍♀️"}
              </ul>
            </div>
          ) : (
            <Loading />
          )}
        </div>
      </main>
    </div>
  );
}
export default Detail;
