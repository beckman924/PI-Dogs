const { Router } = require("express");
const axios = require("axios");
const { API_KEY } = process.env;
const { Breed, Temperament } = require("../db");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getApiInfo = async () => {
  const apiUrl = await axios.get(
    `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
  );

  const apiInfo = await apiUrl.data.map((e) => {
    return {
      id: e.id,
      name: e.name,
      height_min: parseInt(e.height.metric.slice(0, 2).trim()),
      height_max: parseInt(e.height.metric.slice(4).trim()),
      weight_min: parseInt(e.weight.metric.slice(0, 2).trim()),
      weight_max: parseInt(e.weight.metric.slice(4).trim()),
      life_span: e.life_span,
      temperament: e.temperament,
      image: e.image.url,
    };
  });
  return apiInfo;
};

const getDbInfo = async () => {
  return await Breed.findAll({
    include: {
      model: Temperament,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};

const getAllBreeds = async () => {
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbInfo();
  const totalInfo = apiInfo.concat(dbInfo);
  return totalInfo;
};

router.get("/dogs", async (req, res) => {
  const name = req.query.name;
  let totalBreeds = await getAllBreeds();
  if (name) {
    let dogName = await totalBreeds.filter((e) =>
      e.name.toLowerCase().includes(name.toLowerCase())
    );
    dogName.length
      ? res.status(200).send(dogName)
      : res.status(404).send("No breed found with that name");
  } else {
    res.status(200).send(totalBreeds);
  }
});

router.get("/dogs/:id", async (req, res) => {
  const id = req.params.id;
  let allBreeds = await getAllBreeds();
  if (id) {
    let breedId = await allBreeds.filter((e) => e.id == id);
    breedId.length
      ? res.status(200).json(breedId)
      : res.status(404).send("Breed not found with that ID");
  }
});

router.get("/temperaments", async (req, res) => {
  const temperamentsApi = await axios.get(
    `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
  );
  const temperaments = temperamentsApi.data.map((e) => e.temperament);
  const tempEach = temperaments.join(" ").split(", ");
  const tempEachFilter = [...new Set(tempEach)];
  tempEachFilter.forEach((e) => {
    Temperament.findOrCreate({
      where: { name: e },
    });
  });
  const allTemperaments = await Temperament.findAll();
  res.send(allTemperaments);
});

router.post("/dog", async (req, res) => {
  let {
    name,
    height_min,
    height_max,
    weight_min,
    weight_max,
    life_span,
    temperament,
    image,
    createdInDb,
  } = req.body;
  let breedCreated = await Breed.create({
    name,
    height_min,
    height_max,
    weight_min,
    weight_max,
    life_span,
    image,
    temperament,
    createdInDb,
  });

  let temperamentDb = await Temperament.findAll({
    where: { name: temperament },
  });

  breedCreated.addTemperament(temperamentDb);
  res.send("Breed created successfully");
});

module.exports = router;
