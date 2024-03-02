export const getDatabaseURI = (env: NodeJS.ProcessEnv) => {
  const type = env.DATABASE_TYPE;
  const username = env.DATABASE_USERNAME;
  const password = env.DATABASE_PASSWORD;
  const host = env.DATABASE_HOST;
  const port = env.DATABASE_PORT;
  const name = env.DATABASE_NAME;

  return `${type}://${username}:${password}@${host}:${port}/${name}`;
};
