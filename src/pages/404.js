import React from 'react'
import Layout from '../components/layout'
import { Link } from 'gatsby'

const NotFoundPage = () => (
  <Layout>
    <h1>
      Page not found{' '}
      <span role="img" aria-label="sad face">
        😰
      </span>
    </h1>
    <h3>
      Go <Link to="/">home</Link>
    </h3>
  </Layout>
)

export default NotFoundPage
