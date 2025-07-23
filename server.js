import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'
import { createServer as createViteServer } from 'vite'
import { createFetchRequest } from './request.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const isProduction = process.env.NODE_ENV === "production";
const port = process.env.PORT || 5173;
const base = process.env.BASE || '';
const templatePath = isProduction ? "./dist/client/index.html" : 'index.html';

async function createServer() {
    const app = express()

    let vite;
    if (!isProduction) {
        // Create Vite server in middleware mode and configure the app type as
        // 'custom', disabling Vite's own HTML serving logic so parent server
        // can take control
        vite = await createViteServer({
            server: { middlewareMode: true },
            appType: 'custom'
        })
        // Use vite's connect instance as middleware. If you use your own
        // express router (express.Router()), you should use router.use
        // When the server restarts (for example after the user modifies
        // vite.config.js), `vite.middlewares` is still going to be the same
        // reference (with a new internal stack of Vite and plugin-injected
        // middlewares). The following is valid even after restarts.
        app.use(vite.middlewares)
    } else {
        const compression = (await import('compression')).default
        const sirv = (await import('sirv')).default
        app.use(compression())
        app.use(base, sirv('./dist/client', { extensions: [] }))
    }

    app.use('*all', async (req, res, next) => {
        const url = req.originalUrl

        let request = createFetchRequest(req, res);

        try {
            // 1. Read index.html
            let template = fs.readFileSync(
                path.resolve(__dirname, templatePath),
                'utf-8',
            )

            let render;

            if (isProduction) {
                render = (await import("./dist/server/entry-server.js")).render;
            } else {
                // 2. Apply Vite HTML transforms. This injects the Vite HMR client,
                //    and also applies HTML transforms from Vite plugins, e.g. global
                //    preambles from @vitejs/plugin-react
                template = await vite.transformIndexHtml(url, template)
                // 3. Load the server entry. ssrLoadModule automatically transforms
                //    ESM source code to be usable in Node.js! There is no bundling
                //    required, and provides efficient invalidation similar to HMR.
                render = (await vite.ssrLoadModule('/src/entry-server.tsx')).render;
            }

            // 4. render the app HTML. This assumes entry-server.js's exported
            //     `render` function calls appropriate framework SSR APIs,
            //    e.g. ReactDOMServer.renderToString()
            const { html: appHtml, headers } = await render(request)

            // 5. Inject the app-rendered HTML into the template.
            const html = template.replace(`<!--ssr-outlet-->`, () => appHtml)

            // 6. Send the rendered HTML back.
            res.setHeader('Content-Type', 'text/html')
            res.writeHead(200, headers).end(html)
        } catch (e) {
            // If an error is caught, let Vite fix the stack trace so it maps back
            // to your actual source code.
            console.log({ e });
            vite.ssrFixStacktrace(e)
            next(e)
        }
    })

    app.listen(port, () => {
        console.log(`The server started at ${port}`);
    });
}

createServer()