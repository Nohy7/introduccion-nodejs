const http = require("http");
/* let log = require('./modules/my-logs') */
let { info, error } = require('./modules/my-logs');
let { countries } = require('countries-list');
let url = require('url');
let querystring = require('querystring');

let server = http.createServer(function (request, response) {
    let parsed = url.parse(request.url);
    console.log('parsed: ', parsed);

    let pathname = parsed.pathname
    let query = querystring.parse(parsed.query);
    console.log('query: ',query);

    if (pathname == '/') {
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.write('<html><body><p>Hola!</p></body></html>');
        response.end;
    } else if (pathname == '/error') {
        let resul = error(request.url)
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.write(resul);
        response.end;
    } else if (pathname == '/info') {
        let resul = info(request.url)
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.write(resul);
        response.end;
    } else if (pathname == '/country') {
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.write(JSON.stringify(countries[query.code]));
        response.end;
    } else {
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.write('<html><body><p>Pagina no encontrada</p></body></html>');
        response.end;
    }

});

server.listen(4000);
console.log("corriendo en el puerto 4000")


