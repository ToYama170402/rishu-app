const nodeEnv = (): "development" | "production" => {
  return process.env.NODE_ENV === "production" ? "production" : "development";
};
export default nodeEnv;
