/**
 * Helper class for the DataMigration process. Provides
 * some useful methods.
 */

module.exports = {
  forEach: async (array, callback) => {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  },
  makeError: (code, message) => {
    const errors = {
      200: "OK",
      201: "Created",
      304: "Not Modified",
      400: "Bad Request",
      401: "Unauthorized",
      403: "Forbidden",
      404: "Not Found",
      406: "Not Acceptable",
      410: "Gone",
      420: "Enhance Your Calm",
      422: "Unprocessable Entity",
      429: "Too Many Requests",
      500: "Internal Server Error",
      501: "Not Implemented",
      502: "Bad Gateway",
      503: "Service Unavailable",
      504: "Gateway Timeout",
    };

    return {
      statusCode: code,
      error: errors[code],
      message
    };
  },
  makeDatabaseUrl: connection => {
    const { settings, options } = connection;
    const url = `mongodb://${settings.username}:${encodeURIComponent(settings.password)}@${settings.host}:${settings.port}/${settings.database}?authSource=${options.authenticationDatabase}`; 
    return url;
  }
};
