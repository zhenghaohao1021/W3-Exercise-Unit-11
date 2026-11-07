// The (pretend) trip from the browser to the server. Pre-built: leave this file as it is.
//
// A page asks the server for something by passing a server function to callServer(): it waits a moment, like a network
// would, and then runs it. A function that stops with error(404, ...) rejects, with the status on the error.
export const sleep = (ms = 250) => new Promise((resolve) => setTimeout(resolve, ms));

export async function callServer(serverFunction) {
  await sleep();
  return serverFunction();
}
