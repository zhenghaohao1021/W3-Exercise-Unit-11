export function error(status, message) {
  const problem = new Error(message);
  problem.status = status;
  throw problem;
}

export function fail(status, data = {}) {
  return { failed: true, status, data };
}
