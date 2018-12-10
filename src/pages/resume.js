import React from 'react'

import { Document, Page } from 'react-pdf'
import Layout from '../components/layout'

import resume from '../resume/HenryBarrowResume2018.pdf'

export default () => {
  return (
    <Layout>
      <div className="resume-container">
        <a href={resume}>
          <div className="resume">
            <Document file={resume}>
              <Page pageNumber={1} height={700} />
            </Document>
          </div>
        </a>
      </div>
    </Layout>
  )
}
