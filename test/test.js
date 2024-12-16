const Superif = require(__dirname + "/../dist/superif.js");

// Crear una instancia
const superif = new Superif();

// Definir condiciones (IFs)
superif
  .setCondition("isGreaterThan10", async (input) => input > 10)
  .setCondition("isEven", async (input) => input % 2 === 0)
  .setCondition("isAnswer", async (input) => input === 42);

// Definir acciones (THENs)
superif
  .setAction("isGreaterThan10", async (input) => { console.log(`${input} es mayor que 10.`); })
  .setAction("isEven", async (input) => { console.log(`${input} es par.`); })
  .setAction("isAnswer", async (input) => { console.log(`${input} es la respuesta a todo.`); });

// Ejecutar
const input = 42;
superif.execute(input);

// Quitar una acción
superif.removeAction("isEven");

// Ejecutar nuevamente con una acción menos
superif.execute(44);
