module.exports = {
  apps: [
    {
      name: "fastify-app",
      script: "./dist/app.js",
      instances: "max", 
      exec_mode: "cluster",
      env: {
        NODE_ENV: "production",
      },
      env_development: {
        NODE_ENV: "development",
      },
    },
  ],
};
