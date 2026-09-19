import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, resolve, sep } from "node:path";

// A local preview of the exported production files, without a runtime backend.
const root = resolve("out");
const port = Number(process.env.PORT || 3000);
const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "text/javascript",
  ".json": "application/json",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".ico": "image/x-icon",
  ".png": "image/png",
};

const server = createServer(async (req, res) => {
  if (!["GET", "HEAD"].includes(req.method || "")) {
    res.writeHead(405, { Allow: "GET, HEAD" });
    return res.end();
  }
  try {
    const pathname = decodeURIComponent(
      new URL(req.url || "/", "http://localhost").pathname,
    );
    let file = resolve(root, `.${pathname}`);
    if (file !== root && !file.startsWith(root + sep)) {
      res.writeHead(403);
      return res.end("Forbidden");
    }
    if ((await stat(file)).isDirectory()) file = resolve(file, "index.html");
    const data = await readFile(file);
    res.writeHead(200, {
      "Content-Type": mime[extname(file)] || "application/octet-stream",
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": "no-cache",
    });
    res.end(req.method === "HEAD" ? undefined : data);
  } catch {
    const data = await readFile(resolve(root, "404.html")).catch(
      () => "Not found",
    );
    res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    res.end(req.method === "HEAD" ? undefined : data);
  }
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Portfolio preview: http://127.0.0.1:${port}`);
});
