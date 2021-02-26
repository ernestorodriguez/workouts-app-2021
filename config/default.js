module.exports = {
  app: {
    port: 8080,
    staticsFolder: "build",
    apiPath: "/api/",
  },
  site: {
    name: "Awesome workouts",
  },
  dataBase: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    name: process.env.DB_DATABASE,
  },
};
