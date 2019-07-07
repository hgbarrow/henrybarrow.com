import React from 'react'

import Layout from '../components/layout'
import Clock from '../components/Clock/Clock'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'

const IndexPage = () => (
  <Layout>
    <Clock />
    <div className="icon-container">
      <div className="icon-set">
        <div className="icon-button">
          <a href="https://www.linkedin.com/in/henry-barrow-42b54991/">
            <h1>
              <FontAwesomeIcon icon={faLinkedin} fixedWidth />
            </h1>
            <h2>LinkedIn</h2>
          </a>
        </div>
        <div className="icon-button">
          <a href="https://github.com/hgbarrow">
            <h1>
              <FontAwesomeIcon icon={faGithub} fixedWidth />
            </h1>
            <h2>GitHub</h2>
          </a>
        </div>
      </div>
    </div>
  </Layout>
)

export default IndexPage
