module.exports = {
  siteMetadata: {
    title: 'Henry Barrow',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'Henry Barrow',
        short_name: 'Henry Barrow',
        start_url: '/',
        background_color: '#FFF8DC',
        theme_color: '#FFF8DC',
        display: 'minimal-ui',
        icon: 'src/images/HB.jpg', // This path is relative to the root of the site.
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-130780862-1',
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
  ],
}
