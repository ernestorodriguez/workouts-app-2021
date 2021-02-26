import express from 'express';
import config from 'config';
// import webApp from './app/server';
import api from './api';

const { port, staticsFolder, apiPath } = config.get('app');
const App = express();

App.use(express.static(staticsFolder));
App.use(apiPath, api);
// App.use(webApp);

App.listen(port, () => console.log(`Server enable http://localhost:${port}`));
