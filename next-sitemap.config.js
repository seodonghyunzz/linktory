module.exports = {
  siteUrl: process.env.SITE_URL,
  generateRobotsTxt: true,
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ['/admin/*', '/login', '/signup', '/liked'],
};