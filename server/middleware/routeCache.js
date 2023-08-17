import NodeCache from "node-cache";

const cache = new NodeCache();

const routeCache = (duration) => (req, res, next) => {
  // is request a GET ?
  // if not , call next
  if (req.method !== "GET") {
    return next();
  }
  // chack if key exist in cache
  const key = req.originalUrl;
  const cachedResponse = cache.get(key);
  // if it exist , send cache results
  if (cachedResponse) {
    console.log(`Cached hit for ${key}`);
    res.send(cachedResponse);
  } else {
    console.log(`Cache Miss for ${key}`);
    res.originalSend = res.send;
    res.send = (body) => {
      res.originalSend(body);
      cache.set(key, body, duration);
    };
    next();
  }
  // if not, replace . send with method to set response to cache
};

export default routeCache;
