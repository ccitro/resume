import Awards from './components/awards.js'
import Certificates from './components/certificates.js'
import Education from './components/education.js'
import Header from './components/header.js'
import Interests from './components/interests.js'
import Languages from './components/languages.js'
import Meta from './components/meta.js'
import Projects from './components/projects.js'
import Publications from './components/publications.js'
import References from './components/references.js'
import Skills from './components/skills.js'
import Volunteer from './components/volunteer.js'
import Work from './components/work.js'
import html from './utils/html.js'

export default function Resume(resume, css) {
  return html`<!DOCTYPE html>
    <html lang="en">
      <head>
        <!-- 
          Hi! I'm Craig Citro, and this is my resume. Thanks for taking the time to check out the source.

          This resume was buit using the jsonresume schema and the resumed tool. The main template
          was derived from jsonresume-theme-even, but I've made some changes to suit my needs.
          Most of this HTML comes from that template, so don't use it as a reference for my coding
          style, be it good or bad.

          If you're interested, there's a PDF version available at:
          https://resume.citro.net/Craig-Citro-Resume.pdf

          Or you can check out the Github repo that handles building and publishing the resume:
          https://github.com/ccitro/resume

          Thanks again!
        -->
        <meta charset="utf-8">
        ${Meta(resume.basics)}
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>${css}</style>
      </head>
      <body>
        ${Header(resume.basics)}
        ${Work(resume.work)}
        ${Volunteer(resume.volunteer)}
        ${Education(resume.education)}
        ${Projects(resume.projects)}
        ${Awards(resume.awards)}
        ${Certificates(resume.certificates)}
        ${Publications(resume.publications)}
        ${Skills(resume.skills)}
        ${Languages(resume.languages)}
        ${Interests(resume.interests)}
        ${References(resume.references)}
      </body>
    </html>`
}
