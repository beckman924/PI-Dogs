import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postBreed, getTemperaments } from "../../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { GiDogHouse } from "react-icons/gi";
import styles from "./BreedCreate.module.css";
import { validate } from "../../helpers/helpers";
import BreedCreation from "../../assets/images/breedCreation.jpg";

export default function BreedCreate() {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    height_min: "",
    height_max: "",
    weight_min: "",
    weight_max: "",
    min_life_span: "",
    max_life_span: "",
    image: "",
    temperaments: [],
  });

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !Object.getOwnPropertyNames(errors).length &&
      input.name &&
      input.height_min &&
      input.height_max &&
      input.weight_min &&
      input.weight_max &&
      input.min_life_span &&
      input.max_life_span &&
      input.temperaments.length
    ) {
      alert("Breed Created Successfully! 🐶");
      dispatch(postBreed(input));
      setInput({
        name: "",
        height_min: "",
        height_max: "",
        weight_min: "",
        weight_max: "",
        min_life_span: "",
        max_life_span: "",
        image: "",
        temperaments: [],
      });
      navigate("/dogs");
    } else {
      alert("Fill all the fields please 🐕");
    }
  };

  let handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  function handleSelect(e) {
    setInput({
      ...input,
      temperaments: [...input.temperaments, e.target.value],
    });
  }

  function handleDeleteTemperament(e) {
    setInput({
      ...input,
      temperaments: input.temperaments.filter(
        (temperament) => temperament !== e
      ),
    });
  }

  return (
    <div className={styles.container_create}>
      <Link to="/dogs" style={{ color: "inherit", textDecoration: "inherit" }}>
        <button className={styles.homeButton}>
          Home <GiDogHouse />
        </button>
      </Link>

      <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
        <h1 className={styles.form__title}>Create your Breed! 🐶</h1>

        <img src={BreedCreation} alt="" />

        <div className={styles.form__group}>
          <input
            type="text"
            value={input.name}
            name="name"
            className={styles.form__input}
            placeholder=" "
            onChange={(e) => handleChange(e)}
          />
          {errors.name && (
            <p className={styles.error}>
              <strong>{errors.name}</strong>
            </p>
          )}
          <label className={styles.form__label}>Name:</label>
        </div>

        <div className={styles.form__group}>
          <input
            type="text"
            value={input.height_min}
            name="height_min"
            className={styles.form__input}
            placeholder=" "
            onChange={(e) => handleChange(e)}
          />
          {errors.height_min && (
            <p className={styles.error}>
              <strong>{errors.height_min}</strong>
            </p>
          )}
          <label className={styles.form__label}>Height Min in CM:</label>
        </div>

        <div className={styles.form__group}>
          <input
            type="text"
            value={input.height_max}
            name="height_max"
            className={styles.form__input}
            placeholder=" "
            onChange={(e) => handleChange(e)}
          />

          {errors.height_max && (
            <p className={styles.error}>
              <strong>{errors.height_max}</strong>
            </p>
          )}
          <label className={styles.form__label}>Height Max in CM:</label>
        </div>

        <div className={styles.form__group}>
          <input
            type="text"
            value={input.weight_min}
            name="weight_min"
            className={styles.form__input}
            placeholder=" "
            onChange={(e) => handleChange(e)}
          />

          {errors.weight_min && (
            <p className={styles.error}>
              <strong>{errors.weight_min}</strong>
            </p>
          )}
          <label className={styles.form__label}>Weight Min in KG:</label>
        </div>

        <div className={styles.form__group}>
          <input
            type="text"
            value={input.weight_max}
            name="weight_max"
            className={styles.form__input}
            placeholder=" "
            onChange={(e) => handleChange(e)}
          />

          {errors.weight_max && (
            <p className={styles.error}>
              <strong>{errors.weight_max}</strong>
            </p>
          )}
          <label className={styles.form__label}>Weight Max in KG:</label>
        </div>

        <div className={styles.form__group}>
          <input
            type="text"
            value={input.min_life_span}
            name="min_life_span"
            className={styles.form__input}
            placeholder=" "
            onChange={(e) => handleChange(e)}
          />

          {errors.min_life_span && (
            <p className={styles.error}>
              <strong>{errors.min_life_span}</strong>
            </p>
          )}
          <label className={styles.form__label}>Min Life Span:</label>
        </div>

        <div className={styles.form__group}>
          <input
            type="text"
            value={input.max_life_span}
            name="max_life_span"
            className={styles.form__input}
            placeholder=" "
            onChange={(e) => handleChange(e)}
          />

          {errors.max_life_span && (
            <p className={styles.error}>
              <strong>{errors.max_life_span}</strong>
            </p>
          )}
          <label className={styles.form__label}>Max Life Span:</label>
        </div>

        <div className={styles.form__group}>
          <input
            type="text"
            value={input.image}
            name="image"
            className={styles.form__input}
            placeholder=" "
            onChange={(e) => handleChange(e)}
          />
          {/* {errors.image && (
            <p className={styles.error}>
              <strong>{errors.image}</strong>
            </p>
          )} */}
          <label className={styles.form__label}>Url Image:</label>
        </div>

        <div className={styles.main_container}>
          <select onChange={(e) => handleSelect(e)}>
            <option value="selected" hidden>
              Temperaments
            </option>
            {temperaments
              ?.sort(function (a, b) {
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
                return 0;
              })
              .map((e) => {
                return (
                  <option value={e.name} key={e.id}>
                    {e.name}
                  </option>
                );
              })}
          </select>

          <div className={styles.temp_container}>
            {input.temperaments.map((e) => {
              return (
                <span key={e} className={styles.temp__span}>
                  <p>
                    <strong>{e}</strong>
                  </p>
                  <button onClick={() => handleDeleteTemperament(e)}>X</button>
                </span>
              );
            })}
          </div>
        </div>

        <button type="submit" className={styles.form__button}>
          Create Breed!
        </button>
      </form>
    </div>
  );
}
