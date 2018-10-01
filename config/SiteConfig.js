module.exports = {
  pathPrefix: '/', // Prefix for all links. If you deploy your site to example.com/portfolio your pathPrefix should be "portfolio"

  siteTitle: 'YABYAB', // Navigation and Site Title
  siteTitleAlt: 'Yet Another Birin - Yet Another Blog', // Alternative Site title for SEO
  siteUrl: 'https://dmitrybirin.github.io', // Domain of your site. No trailing slash!
  siteLanguage: 'en', // Language Tag on <html> element
  siteBanner: '/social/banner.jpg', // Your image for og:image tag. You can find it in the /static folder
  favicon: 'src/favicon.png', // Your image for favicons. You can find it in the /src folder
  siteDescription: 'Minimal Blog with big typography', // Your site description
  author: 'Dmitry Birin',

  // siteFBAppID: '123456789', // Facebook App ID - Optional
  userTwitter: '@BirinDmitry',
  ogSiteName: 'Birin Blog', // Facebook Site Name - Optional
  ogLanguage: 'en_US', // Facebook Language

  // Manifest and Progress color
  // See: https://developers.google.com/web/fundamentals/web-app-manifest/
  themeColor: '#1390d3',
  backgroundColor: '#ffffff',

  // Settings for typography.js
  headerFontFamily: 'Bitter',
  bodyFontFamily: 'Open Sans',
  baseFontSize: '18px',
};
