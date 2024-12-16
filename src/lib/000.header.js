(function (factory) {

  const mod = factory();

  if (typeof window !== "undefined") {
    window.SuperIf = mod;
  }
  if (typeof global !== "undefined") {
    global.SuperIf = mod;
  }
  if (typeof module !== "undefined") {
    module.exports = mod;
  }

})(function () {