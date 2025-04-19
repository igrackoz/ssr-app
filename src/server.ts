import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine, isMainModule } from '@angular/ssr/node';
import express, { Express } from 'express';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import bootstrap from './main.server';

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');
const indexHtml = join(serverDistFolder, 'index.server.html');
const commonEngine = new CommonEngine();

/**
 * This function creates and returns an Express app — Netlify requires this shape.
 */
export function app(): Express {
  const app = express();

  // Serve static files
  app.get(
    '*.*',
    express.static(browserDistFolder, {
      maxAge: '1y',
      index: false
    }),
  );

  // SSR for all other routes
  app.get('**', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  return app;
}

/**
 * Run the server locally if not in Netlify's context
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

export default app(); // Netlify requires default export of the Express instance
``
