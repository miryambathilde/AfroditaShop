// METODO #1 PARA OBTENER TODOS LOS CLIENTES //

const getAll = () => {
  return new Promise((resolve, reject) => {
    db.query('select * from clients', (err, result) => {
      if (err) return reject(err);
      resolve(result);
    })
  });
};

module.exports = {
  getAll
}