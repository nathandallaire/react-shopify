module.exports = {
  requireUncached,
};

function requireUncached(module) {
  const modulePath = `../../${module}`;
  delete require.cache[require.resolve(modulePath)];
  return require(modulePath);
}
