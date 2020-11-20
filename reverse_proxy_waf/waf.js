let proxy = require("express-http-proxy");
let app = require("express")();
let sanitizeHTML = require("sanitize-html");
let colors = require("colors");
colors.setTheme({
  silly: "rainbow",
  info: "green",
  data: "grey",
  warn: "yellow",
  error: "red",
});

const options = {
  allowedTags: [],
};

let headers = ["Content-Type", "user-agent"];

/**
 * sanitizeRequestURL
 *
 * @param Request object
 * @return String of sanitize URL.
 */
let sanitizeRequestURL = function (req) {
  let prevURL = req.url;
  let decodeURL = decodeURI(req.url);
  decodeURL = sanitize(decodeURL);
  let newURL = encodeURI(decodeURL);
  if (newURL !== prevURL) {
    console.log("Alert! Reflected XSS Detected".error + " Content: " + prevURL);
  }
  return newURL;
};

let filterRequests = function () {
  return true;
};

function sanitize(content) {
  return sanitizeHTML(content, options);
}

/**
 * getURLParams
 *
 * @param Search string, beginning with '?'.
 *     For example: '?a=1&b=2'
 * @return Array of URL param objects.
 */
var getURLParams = function (search) {
  var params = [];
  var rawParams = search.substring(0).split("&");
  var param, index, name, value;

  for (var i = 0, len = rawParams.length; i < len; i++) {
    param = rawParams[i];
    index = param.indexOf("=");

    switch (true) {
      // Name and value are defined.
      // For example: ?a=1&b=2.
      case index > 0:
        name = param.substring(0, index);
        value = param.substring(index + 1);
        break;

      // Value is undefined.
      // For example: ?a&b.
      case index === -1:
        name = param;
        value = "";
        break;

      // Name  is undefined.
      // For example: ?=11111111&=2
      case index === 0:
        name = "";
        value = param.substring(index + 1);
        break;

      default:
        break;
    }

    params.push({
      name: name,
      value: value,
      denied: false,
    });
  }

  return params;
};

/**
 * sanitizeURLParams
 *
 * @param content object with parameters from URL
 * @return String with sanitize parameters.
 */
let sanitizeURLParams = function (content) {
  let prevContent = content;
  content = decodeURI(content);
  let sanitizeString = "";

  let arrFromParams = getURLParams(content);

  for (let i = 0; i < arrFromParams.length; i++) {
    sanitizeString +=
      arrFromParams[i].name + "=" + sanitize(arrFromParams[i].value) + "&";
  }
  content = sanitizeString;
  content = content.substring(0, content.length - 1);
  let newContent = encodeURI(content);
  if (newContent !== prevContent) {
    console.log(
      "Alert! Persistent XSS Detected".error + " Content:" + prevContent
    );
  }

  return newContent;
};

let sanitizeURLParamsJSON = function (content) {
  let prevContent = content;
  content = JSON.parse(content);
  let keys = Object.keys(content);

  for (let i = 0; i < keys.length; i++) {
    content[keys[i]] = sanitize(content[keys[i]]);
  }
  let newContent = JSON.stringify(content);
  if (prevContent !== newContent) {
    console.log(
      "Alert! Persistent XSS Detected".error + " Content: " + prevContent
    );
  }
  return newContent;
};

let reqBodyDecorator = function (bodyContent, srcReq) {
  let method = srcReq["method"];
  let content;
  if (method === "GET") {
    return bodyContent;
  } else {
    for (let i = 0; i < headers.length; i++) {}

    if (
      srcReq.header("Content-Type") ===
      "application/x-www-form-urlencoded; charset=UTF-8"
    ) {
      content = bodyContent.toString();
      content = sanitizeURLParams(content);
    } else if (
      srcReq.header("Content-Type") === "application/json; charset=UTF-8"
    ) {
      content = bodyContent.toString();
      content = sanitizeURLParamsJSON(content);
    } else {
      return bodyContent;
    }
    return Buffer.from(content, "utf-8");
  }
};
reqOptionsDecorator = function (proxyReqOpts) {
  return proxyReqOpts;
};

let resDecorator = function (proxyRes, proxyResData) {
  return proxyResData;
};

let resHeadDecorator = function (headers) {
  headers["X-XSS-Protection"] = "1";
  return headers;
};

app.use(
  "/",
  proxy("127.0.0.1:3000", {
    proxyReqPathResolver: sanitizeRequestURL,
    filter: filterRequests,
    // default
    userResDecorator: resDecorator,
    userResHeaderDecorator: resHeadDecorator,
    proxyReqBodyDecorator: reqBodyDecorator,
    proxyReqOptDecorator: reqOptionsDecorator,
    parseReqBody: true,
    memoizeHost: false,
    preserveHostHdr: true,
    reqAsBuffer: true,
  })
);

const port = 3001;

app.listen(port, () =>
  console.log(`Reverse-proxy-waf listening at http://localhost:${port}`)
);
