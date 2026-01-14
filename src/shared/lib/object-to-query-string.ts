export function buildQueryString(params: any) {
  if (typeof params !== "object" || params === null) {
    throw new Error("Expected params to be an object");
  }

  const queryStringParts = [];

  for (const key in params) {
    const value = params[key];

    if (Array.isArray(value)) {
      value.forEach((item) => {
        queryStringParts.push(
          `${encodeURIComponent(key)}=${encodeURIComponent(item)}`
        );
      });
    } else if (value !== undefined && value !== null) {
      queryStringParts.push(
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      );
    }
  }

  const queryString = queryStringParts.join("&");
  return `?${queryString}`;
}
