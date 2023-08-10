export function logger(req, res, next) {
  const { method, path } = req;
  console.log(`访问${method} ${path}`);
  next();
}
