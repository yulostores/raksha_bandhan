const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const requestedPort = Number(process.env.PORT);
const port = Number.isInteger(requestedPort) && requestedPort > 0 && requestedPort <= 65535
  ? requestedPort
  : 4173;
const host = process.env.HOST || "0.0.0.0";
const root = __dirname;
const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon"
};
const publicFiles = new Set([
  "index.html",
  "styles.css",
  "script.js",
  "yuloStoresLogo.jpeg",
  "privacy-policy.html",
  "delete-account.html"
]);

const server = http.createServer((request, response) => {
  if (request.method !== "GET" && request.method !== "HEAD") {
    response.writeHead(405, { Allow: "GET, HEAD" });
    response.end("Method not allowed");
    return;
  }

  let requestPath;
  try {
    const requestUrl = new URL(request.url || "/", "http://localhost");
    requestPath = decodeURIComponent(requestUrl.pathname);
  } catch {
    response.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Bad request");
    return;
  }

  const relativePath = requestPath === "/" ? "index.html" : requestPath.replace(/^\/+/, "");
  const filePath = path.resolve(root, relativePath);

  const isInsideRoot = filePath.startsWith(`${root}${path.sep}`);
  const isPublicFile = publicFiles.has(relativePath) || relativePath.startsWith("assets/");
  if (!isInsideRoot || !isPublicFile) {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
    return;
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      response.writeHead(error.code === "ENOENT" ? 404 : 500);
      response.end(error.code === "ENOENT" ? "Not found" : "Server error");
      return;
    }

    const extension = path.extname(filePath).toLowerCase();
    const shouldRevalidate = [".html", ".css", ".js"].includes(extension);
    response.writeHead(200, {
      "Content-Type": mimeTypes[extension] || "application/octet-stream",
      "Cache-Control": shouldRevalidate ? "no-cache" : "public, max-age=86400"
    });
    response.end(request.method === "HEAD" ? undefined : data);
  });
});

server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.error(`Port ${port} is already in use. Stop the other server or run with a different PORT.`);
  } else if (error.code === "EACCES") {
    console.error(`Permission denied while trying to use ${host}:${port}.`);
  } else {
    console.error("Unable to start the Yulo Stores website:", error.message);
  }
  process.exitCode = 1;
});

server.listen(port, host, () => {
  console.log(`Yulo Stores website is ready at http://localhost:${port}`);
  console.log(`Listening on ${host}:${port} so the site can be opened from previews and other devices.`);
});
