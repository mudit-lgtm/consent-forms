/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: process.env.SITE_URL || "https://consentforms.app",
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api"],
      },
    ],
  },
  exclude: ["/admin", "/api/*", "/404", "/500"],
  changefreq: "weekly",
  priority: 0.7,
  sitemapSize: 50000,
}

module.exports = config
