import express from "express";
import config from "config";
import ExpressCache from "express-cache-middleware";
import cacheManager from "cache-manager";

import webApp from "./app/server";
import api from "./api";

const cacheMiddleware = new ExpressCache(
  cacheManager.caching({
    store: "memory",
    max: 10000,
    ttl: 3600,
  })
);

const { port, staticsFolder, apiPath } = config.get("app");
const App = express();

App.use(express.static(staticsFolder));
cacheMiddleware.attach(App);
App.use(apiPath, api);
App.use(webApp);

App.listen(port, () => console.log(`Server enable http://localhost:${port}`));
