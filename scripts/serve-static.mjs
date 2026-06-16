import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";

const port = Number(process.env.PORT || 3000);
const outDir = path.join(process.cwd(), "out");

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
};

const server = createServer(async (request, response) => {
  try {
    const requestUrl = new URL(request.url || "/", `http://127.0.0.1:${port}`);
    const requestedPath =
      requestUrl.pathname === "/" ? "/index.html" : requestUrl.pathname;
    const safePath = path.normalize(decodeURIComponent(requestedPath)).replace(/^[/\\]+/, "");
    let filePath = path.join(outDir, safePath);

    if (!filePath.startsWith(outDir)) {
      response.writeHead(403);
      response.end("Forbidden");
      return;
    }

    filePath = await resolveStaticFile(filePath, safePath);

    const data = await readFile(filePath);
    response.writeHead(200, {
      "content-type": mimeTypes[path.extname(filePath)] || "application/octet-stream",
    });
    response.end(data);
  } catch {
    response.writeHead(500, { "content-type": "text/plain; charset=utf-8" });
    response.end("Server error");
  }
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Serving static demo at http://127.0.0.1:${port}`);
});

async function resolveStaticFile(filePath, safePath) {
  try {
    const fileStat = await stat(filePath);

    if (!fileStat.isDirectory()) {
      return filePath;
    }

    const indexPath = path.join(filePath, "index.html");

    try {
      await stat(indexPath);
      return indexPath;
    } catch {
      const htmlRoutePath = path.join(outDir, `${safePath.replace(/[\\/]$/, "")}.html`);
      await stat(htmlRoutePath);
      return htmlRoutePath;
    }
  } catch {
    const htmlRoutePath = path.join(outDir, `${safePath}.html`);

    try {
      await stat(htmlRoutePath);
      return htmlRoutePath;
    } catch {
      return path.join(outDir, "404.html");
    }
  }
}
