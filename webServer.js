const http = require("http");
const fs = require("fs");
const PORT = 8000;

const getFilePath = (request) => {
  return '.' + request.url + 'app' + '/index.html';
}

const fileContent = (request) => {
  return fs.readFileSync(getFilePath(request));
}

const convertWriteHead = (response, request) => {
  return response.writeHead(200, { 'content-length': fileContent(request).length });
}

const response404 = (response) => {
  response.writeHead(404, { 'content-length': 0 });
  response.end('404 not fund');
  return;
}

const responseEnd = (response, fileContent, request) => {
  if (!fs.existsSync(getFilePath(request))) {
    response404(response, request);
  }
  return response.end(fileContent);
}

http.createServer((request, response) => {
  convertWriteHead(response, request);
  responseEnd(response, request, fileContent(request));
}).listen(PORT);
