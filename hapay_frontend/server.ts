import 'zone.js/dist/zone-node';

import * as express from 'express';
import { join } from 'path';
import * as compression from 'compression';
import { REQUEST, RESPONSE } from '@nguniversal/express-engine/tokens';

// Express server
const app = express();
app.use(compression());

const PORT = process.env.PORT || 4000;
const DIST_FOLDER = join(process.cwd(), 'dist/browser');

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const { AppServerModuleNgFactory, LAZY_MODULE_MAP, ngExpressEngine, provideModuleMap } = require('./dist/server/main');

// Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
}));

app.set('view engine', 'html');
app.set('views', DIST_FOLDER);

app.get('/robots933456.txt', (req, res) => {
  res.type('text/plain');
  res.send("User-agent: *\nDisallow: /");
});
// Example Express Rest API endpoints
// app.get('/api/**', (req, res) => { });
// Serve static files from /browser
app.get('*.*', express.static(DIST_FOLDER, {
  maxAge: '1y'
}));

// All regular routes use the Universal engine
app.get('*', (req, res) => {
  const http = req.headers['x-forwarded-proto'] === undefined ? 'http' : req.headers['x-forwarded-proto'];
  res.render('index', {
    req: req,
    res: res,
    preboot: true,
    baseUrl: '/',
    requestUrl: req.originalUrl,
    // provers from server
    providers: [
      // for http and cookies
      {
        provide: REQUEST,
        useValue: req,
      },
      {
        provide: RESPONSE,
        useValue: res,
      },
      // for absolute path
      {
        provide: 'ORIGIN_URL',
        useValue: `${http}://${req.headers.host}`,
      },
    ],
  });
});

// Start up the Node server
app.listen(PORT, () => {
  console.log(`Node Express server listening on http://localhost:${PORT}`);
});
