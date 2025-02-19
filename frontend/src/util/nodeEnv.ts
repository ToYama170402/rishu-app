const nodeEnv = (): "development" | "production" => {
  if (typeof process.env.NODE_ENV === "undefined") {
    throw new Error("NODE_ENV is not defined");
  }
  return process.env.NODE_ENV === "production" ? "production" : "development";
};
export default nodeEnv;
