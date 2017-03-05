import express from 'express';
import apiRouter from '../config/apiRouter';
import paths from '../config/paths';

const app = express();
const port = parseInt(process.env.PORT, 10) || 3000;

// API Route
apiRouter(app);

// single-page Route
app.use(express.static(paths.appBuild));
app.use('*', (req, res) => {
  res.sendFile(paths.appBuild + '/index.html');
});

app.listen(port, function () {
  console.log(`listening on port ${port}!`);
});
