import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            {
              name: 'description',
              content:
                'Henry Barrow. Software engineer extraordinaire. Specializing in React, Go, d3, machine learning, and more',
            },
            {
              name: 'keywords',
              content: 'Software engineer, phd, react, go, es6, es7, python',
            },
          ]}
        >
          <html lang="en" />
        </Helmet>
        <div
          style={{
            margin: '0 auto',
            maxWidth: 960,
            padding: '0px 1.0875rem 1.45rem',
            paddingTop: 0,
          }}
        >
          {children}
        </div>
        <div className="footer">
          <p>Copyright 2019 Henry Barrow</p>
        </div>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
