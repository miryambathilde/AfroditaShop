const express = require('express');
const router = express.Router();
const {getAll} = require('../../models/client.model');


// GET
/* como devuelve una promesa ASYNC AWAIT TRY CATCH */
// 1. delante de la funcion que devuelve la promesa le ponemos el await
// 2. el await lo guardamos en una constante
// 3. el async lo tenemos que ponerlo delante de la ejecución de la función

router.get('/', async (req, res) => {
  try {
    const result = await getAll();
    res.json(result);
  } catch (error) {
    res.json({ error: error.message });
  }
});


// POST 


// PUT


// DELETE 


module.exports = router