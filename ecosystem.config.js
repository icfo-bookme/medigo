module.exports = {
  apps: [
    {
      name: "medigo",
      script: "npm",
      args: "run start",
      cwd: "/var/www/medigo",
      watch: false,
      env: {
        NODE_ENV: "production",
        PORT: 3300,
      },
    },
  ],
};