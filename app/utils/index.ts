export const pathEncoded = (path: string | undefined) => {
  const encodedPath = path
    ?.split("/")
    .map((v) => encodeURIComponent(v))
    .join("/");

  return encodedPath;
};

export const objToUrl = (obj: any, encode = true) => {
  const params = [];
  for (const key of Object.keys(obj)) {
    const value = obj[key];
    let res;

    if (value === undefined || value === null) continue;

    if (typeof value === "string" || typeof value === "number") {
      res = encode
        ? `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
        : `${key}=${value}`;
    }

    params.push(res);
  }
  const url = params.join("&");
  return url;
};
