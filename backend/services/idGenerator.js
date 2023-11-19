const SnowflakeId = require("snowflake-id").default;

// Initialize snowflake
const snowflake = new SnowflakeId({
  mid: 21,
  offset: (2023 - 1970) * 31536000 * 1000,
});

// Generate a unique id
const generateId = () => {
  const id = snowflake.generate();
  return id;
};

module.exports = { generateId };
