import { renderToString } from "react-dom/server";
import { createStaticHandler, createStaticRouter, StaticRouterProvider } from "react-router-dom/server";
import { routes } from "./routes";

let { query, dataRoutes } = createStaticHandler(routes);

export const render = async (request: Request) => {
    let context = await query(request);

    if (context instanceof Response) {
        return context;
    }

    let router = createStaticRouter(dataRoutes, context);

    let html = renderToString(
        <StaticRouterProvider
            router={router}
            context={context}
        />
    );

    let leaf = context.matches[context.matches.length - 1];
    let actionHeaders = context.actionHeaders[leaf.route.id];
    let loaderHeaders = context.loaderHeaders[leaf.route.id];
    let headers = new Headers(actionHeaders);
    if (loaderHeaders) {
        for (let [key, value] of loaderHeaders.entries()) {
            headers.append(key, value);
        }
    }

    return { html, headers };
}