class Superif {

  static create(...args) {
    return new this(...args);
  }

  constructor() {
    this.conditions = new Map(); // Mapa para las condiciones (nombre -> función)
    this.actions = []; // Array ordenado de acciones { name, fn }
    this.actionMap = new Map(); // Mapa de referencia para acciones (nombre -> índice en this.actions)
  }

  // Agregar o actualizar una condición
  setCondition(name, condition) {
    if (typeof condition !== "function") {
      throw new Error("Las condiciones deben ser funciones.");
    }
    this.conditions.set(name, condition);
    return this; // Permite encadenar
  }

  // Eliminar una condición
  removeCondition(name) {
    this.conditions.delete(name);
    return this;
  }

  // Agregar o actualizar una acción
  setAction(name, action) {
    if (typeof action !== "function") {
      throw new Error("Las acciones deben ser funciones.");
    }

    // Si ya existe, actualizarla manteniendo el orden
    if (this.actionMap.has(name)) {
      const index = this.actionMap.get(name);
      this.actions[index].fn = action;
    } else {
      // Si no existe, agregarla al final
      this.actionMap.set(name, this.actions.length);
      this.actions.push({ name, fn: action });
    }
    return this;
  }

  // Eliminar una acción
  removeAction(name) {
    if (this.actionMap.has(name)) {
      const index = this.actionMap.get(name);

      // Eliminar del array de acciones y ajustar el mapa
      this.actions.splice(index, 1);
      this.actionMap.delete(name);

      // Actualizar índices en el mapa
      for (let i = index; i < this.actions.length; i++) {
        this.actionMap.set(this.actions[i].name, i);
      }
    }
    return this;
  }

  // Ejecutar el algoritmo
  async execute(input) {
    // Paso 1: Evaluar todas las condiciones (asincrónicamente)
    const conditionResults = await Promise.all(
      Array.from(this.conditions.entries()).map(async ([name, condition]) => {
        const result = await condition(input);
        return result ? name : null;
      })
    );

    // Paso 2: Recolectar los nombres únicos de las acciones activas
    const activeActions = new Set(conditionResults.filter(Boolean));

    // Paso 3: Ejecutar las acciones activas en orden definido
    for (const { name, fn } of this.actions) {
      if (activeActions.has(name)) {
        await fn(input);
      }
    }
  }
}

Superif.default = Superif;

return Superif;
