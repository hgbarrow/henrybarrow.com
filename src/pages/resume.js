import React from 'react'

import { Document, Page, pdfjs } from 'react-pdf'
import Layout from '../components/layout'

import resume from '../resume/HenryBarrowResume2018.pdf'
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${
  pdfjs.version
}/pdf.worker.js`

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
