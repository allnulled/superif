# superif

Clase en JS para crear estructuras IF-ELSE complejas.

## Instalación

### Descargar la librería

```
npm install -s @allnulled/superif
```

### Importar la librería

#### Modos de importar la librería

Dado que usa otras librerías, y pueden quererse usar desde otros módulos o no, puedes usar el archivo:

  - `superif.js`: este fichero tiene todas las APIs necesarias.
  - `superif.unbundled.js`: este fichero solo tiene la parte que le es propia, y sobreentiende que cargarás las otras librerías necesarias por tu propia cuenta.

**NOTA:** Por defecto, se usa `superif.unbundled.js`.

#### En node.js

Puedes usar `require` o `import` indistintamente para importar el módulo.

#### En browser

```html
<script src="node_modules/@allnulled/superif/dist/superif.js"></script>
```

O alternativamente:

```html
<script src="node_modules/@allnulled/superif/dist/lib/ufs.js"></script>
<script src="node_modules/@allnulled/superif/dist/superif.unbundled.js"></script>
```

## API

### Crear un superif

Para crear un superif, desde node.js puedes:

```js
const superif = require("@allnulled/superif").create();
```

Si estás en browser y no usas módulos, o si estás en node.js y no quieres usar require, puedes:

```js
const superif = Superif.create();
```

### Usar un superif

Este es un ejemplo de uso:

```js
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
```