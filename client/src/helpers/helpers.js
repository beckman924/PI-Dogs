export function validate(input) {
  let errors = {};

  if (!input.name) {
    errors.name = "Your breed must have a name";
  } else if (input.name.length > 30) {
    errors.name = "That´s way too long a name. Keep it simple!!";
  } else if (!input.height_min) {
    errors.height_min = "Minimum height is required!!";
  } else if (isNaN(parseInt(input.height_min))) {
    errors.height_min = "Height should be a number";
  } else if (input.height_min <= 0) {
    errors.height_min = "Your breed can´t be shorter than 0";
  } else if (input.height_min.length > 2) {
    errors.height_min = "Only two numbers accepted";
  } else if (parseInt(input.height_min) >= parseInt(input.height_max)) {
    errors.height_min = "Minimum height should be lower than maximum height";
  } else if (!input.height_max) {
    errors.height_max = "Maximum height is required!!";
  } else if (isNaN(parseInt(input.height_max))) {
    errors.height_max = "Height should be a number";
  } else if (input.height_max > 150) {
    errors.height_max =
      "I think 150cm is enough for a dog´s height, don´t you?";
  } else if (!input.weight_min) {
    errors.weight_min = "Minimum weight is required!!";
  } else if (isNaN(parseInt(input.weight_min))) {
    errors.weight_min = "Weight should be a number";
  } else if (input.weight_min.length > 2) {
    errors.weight_min = "Only two numbers accepted";
  } else if (input.weight_min <= 0) {
    errors.weight_min = "Your breed must weight at least more than nothingness";
  } else if (!input.weight_max) {
    errors.weight_max = "Maximum weight is required!!";
  } else if (isNaN(parseInt(input.weight_max))) {
    errors.weight_max = "Weight should be a number";
  } else if (input.weight_max.length > 3) {
    errors.weight_max = "Only three numbers accepted";
  } else if (parseInt(input.weight_max) <= parseInt(input.weight_min)) {
    errors.weight_max = "Maximum weight should be higher than minimum weight";
  } else if (input.weight_max > 200) {
    errors.weight_max =
      "We are creating a dog, not an elephant 🐘!! Keep your weight under 200";
  } else if (!input.min_life_span) {
    errors.min_life_span =
      "Minimum life span is required!, fill it with two numbers";
  } else if (input.min_life_span.length > 2) {
    errors.min_life_span = "Only two numbers accepted";
  } else if (isNaN(parseInt(input.min_life_span))) {
    errors.min_life_span = "Life span should be a number";
  } else if (input.min_life_span <= 0) {
    errors.min_life_span = "Look´s like that dog didn´t born yet, uh?";
  } else if (!input.max_life_span) {
    errors.max_life_span =
      "Maximum life span is required!, fill it with two numbers";
  } else if (input.max_life_span.length > 2) {
    errors.max_life_span = "Only two numbers accepted";
  } else if (isNaN(parseInt(input.max_life_span))) {
    errors.max_life_span = "Life span should be a number";
  } else if (input.max_life_span > 50) {
    errors.max_life_span = "Sadly, dogs don´t live that long 😥";
  }

  return errors;
}
