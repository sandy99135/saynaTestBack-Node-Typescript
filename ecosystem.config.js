module.exports = {
    apps: [
      {
        name: "test",
        script: "dist\\app.js",
        env: {
          NODE_ENV: "development"
        },
        env_production: {
          NODE_ENV: "production"
        },
        instances: 1,
        exec_mode: "fork"
      },
      {
        name: "PinManagement",
        script: "..\\..\\PinManagement\\start.js",
        env: {
          NODE_ENV: "development"
        },
        env_production: {
          NODE_ENV: "production"
        },
        instances: 1,
        exec_mode: "fork"
      }
    ]
  }
  
