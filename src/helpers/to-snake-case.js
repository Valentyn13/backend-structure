function toSnakeCase(obj) {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const newKey = key.replace(/([A-Z])/g, "_$1").toLowerCase();
      if (newKey !== key) {
        obj[newKey] = obj[key];
        delete obj[key];
      }
    }
  }
}

module.exports = toSnakeCase;
