import Instagram from 'node-instagram';

require('dotenv').config({silent: true});

// Instagram
const instagram = new Instagram({
  clientId: process.env.INSTAGRAM_CLIENT_ID,
  accessToken: process.env.INSTAGRAM_ACCESS_TOKEN,
});

function request(url, req, res) {
  instagram.get(url).then((data) => {
    res.json(data);
  }).catch((err) => {
    res.status(403).json(err).end();
  });
}

export default function apiRouter(app) {

  // Feed
  app.get('/api/feed', (req, res) => {
    request('users/self/media/recent', req, res);
  });
  app.get('/api/feed/:userId', (req, res) => {
    request(`users/${req.params.userId}/media/recent`, req, res);
  });

  // Media
  app.get('/api/media/:id', (req, res) => {
    request(`media/shortcode/${req.params.id}`, req, res);
  });

}
