import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'

import Clock from '../components/Clock/Clock'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileAlt } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'

const IndexPage = () => (
  <Layout>
    <Clock />
    <div className="icon-container">
      <div className="icon-set">
        <div className="icon-button">
          <Link to="/resume">
            <h1>
              <FontAwesomeIcon icon={faFileAlt} fixedWidth />
            </h1>
            <h2>Resume</h2>
          </Link>
        </div>
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
