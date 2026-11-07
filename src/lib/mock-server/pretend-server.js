// ═══════════════════════════════════════════════════════════════════════════
// Pretend server — pre-built, leave this block as it is (your work starts below).
// It answers fetch() calls to https://api.telebort.test/... INSIDE this page, so
// POST / PUT / DELETE, status codes, headers and Authorization all work in the preview.
// Every other address goes to the real fetch (GET to the allowed sites).
// Headers travel both ways: req.headers (lower-case names) holds what the page sent, and
// res.set('Name', 'value') adds a header to the reply (read it with response.headers.get).
// ═══════════════════════════════════════════════════════════════════════════
/* global window, localStorage, Response, Headers, URL, setTimeout */
// eslint-disable-next-line no-unused-vars -- `app` is the global the student's own code uses
export const app = (function () {
  var ORIGIN = 'https://api.telebort.test';
  var realFetch = window.fetch ? window.fetch.bind(window) : null;
  var routes = [];
  var middleware = [];
  var DB_KEY = 'pretend-server-db';
  var db = {};
  try { db = JSON.parse(localStorage.getItem(DB_KEY) || '{}'); } catch { db = {}; }
  var server = { db: db, latencyMs: 250, log: true };

  server.save = function () { localStorage.setItem(DB_KEY, JSON.stringify(server.db)); };
  server.reset = function () { Object.keys(server.db).forEach(function (k) { delete server.db[k]; }); server.save(); };

  function add(method, path, handler) { routes.push({ method: method, parts: path.split('/').filter(Boolean), handler: handler }); }
  ['get', 'post', 'put', 'patch', 'delete'].forEach(function (m) {
    server[m] = function (path, handler) { add(m.toUpperCase(), path, handler); };
  });
  server.use = function (fn) { middleware.push(fn); };

  function match(route, method, parts) {
    if (route.method !== method || route.parts.length !== parts.length) return null;
    var params = {};
    for (var i = 0; i < parts.length; i += 1) {
      if (route.parts[i].charAt(0) === ':') params[route.parts[i].slice(1)] = decodeURIComponent(parts[i]);
      else if (route.parts[i] !== parts[i]) return null;
    }
    return params;
  }

  function reply(status, body, extraHeaders) {
    var noBody = status === 204 || status === 205 || status === 304; // a Response with these statuses must have a null body
    var text = body === undefined || noBody ? null : JSON.stringify(body);
    var headers = new Headers({ 'Content-Type': 'application/json' });
    Object.keys(extraHeaders || {}).forEach(function (name) {
      try { headers.set(name, String(extraHeaders[name])); } catch { /* res.set already refuses bad names; a hand-edited res.headers entry is skipped */ }
    });
    return new Response(text, { status: status, headers: headers });
  }

  window.fetch = function (input, init) {
    var url = new URL(String(input && input.url ? input.url : input), ORIGIN);
    if (url.origin !== ORIGIN) return realFetch ? realFetch(input, init) : Promise.reject(new TypeError('Failed to fetch'));
    init = init || {};
    var method = String(init.method || (input && input.method) || 'GET').toUpperCase();
    var headers = {};
    [input && input.headers, init.headers].forEach(function (source) {
      if (source) new Headers(source).forEach(function (value, key) { headers[key.toLowerCase()] = value; });
    });
    var body;
    if (init.body !== undefined && init.body !== null) { try { body = JSON.parse(init.body); } catch { body = init.body; } }
    var query = {};
    url.searchParams.forEach(function (value, key) { query[key] = value; });
    var parts = url.pathname.split('/').filter(Boolean);
    var req = { method: method, path: url.pathname, query: query, headers: headers, body: body, params: {} };

    return new Promise(function (resolve) {
      setTimeout(function () {
        var status = 200;
        var sent = null;
        var resHeaders = {};
        function setHeader(name, value) {
          if (name && typeof name === 'object') {
            Object.keys(name).forEach(function (key) { setHeader(key, name[key]); });
            return res;
          }
          new Headers().set(String(name), String(value)); // throws a TypeError for a bad header name or value
          resHeaders[String(name).toLowerCase()] = String(value);
          return res;
        }
        var res = {
          headers: resHeaders,
          status: function (code) { status = code; return res; },
          set: setHeader,
          header: setHeader,
          json: function (data) { sent = reply(status, data, resHeaders); return res; },
          send: function (data) { sent = reply(status, data, resHeaders); return res; },
        };
        try {
          for (var m = 0; m < middleware.length && !sent; m += 1) middleware[m](req, res);
          if (!sent) {
            var found = routes.filter(function (r) { var p = match(r, method, parts); if (p) req.params = p; return p; })[0];
            if (!found) res.status(404).json({ error: 'No route for ' + method + ' ' + url.pathname });
            else found.handler(req, res);
          }
        } catch (error) {
          res.status(500).json({ error: String(error && error.message ? error.message : error) });
        }
        if (!sent) sent = reply(204, undefined, resHeaders);
        if (server.log) console.log(method + ' ' + url.pathname + ' -> ' + sent.status);
        resolve(sent);
      }, server.latencyMs);
    });
  };
  return server;
})();
