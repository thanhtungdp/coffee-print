module.exports = {
  /**
	 * Application configuration section
	 * http://pm2.keymetrics.io/docs/usage/application-declaration/
	 */
  apps: [
    // First application
    {
      name: 'coffee_print',
      script: './run.sh',
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ],

  /**
	 * Deployment section
	 * http://pm2.keymetrics.io/docs/usage/deployment/
	 */
  deploy: {
    production: {
      user: 'root',
      host: '103.221.220.245',
      ref: 'origin/release/production-inhinh',
      repo: 'ssh://git@github.com:thanhtungdp/coffee-print.git',
      path: '/data/pm2/coffee_print',
      'post-deploy': 'yarn install && yarn build && pm2 reload ecosystem.config.js --env production'
    }
  }
}
