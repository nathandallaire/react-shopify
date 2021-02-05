module.exports = {
  requireUncached,
};

function requireUncached(module) {
  const modulePath = `../../${module}`;
  console.log(require.resolve(modulePath));
  delete require.cache[require.resolve(modulePath)];
  return require(modulePath);
}
