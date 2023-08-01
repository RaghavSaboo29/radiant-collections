import React from 'react'
import Footer from '../footer/Footer'
import { Helmet } from 'react-helmet'
import Navbar2 from '../navbar/Navbar2'
import BreadCrumb2 from '../breadcrumb/BreadCrumb2'

const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Navbar2 />
      <BreadCrumb2 />
      <main style={{ minHeight: '78vh' }}>{children}</main>
      <Footer />
    </div>
  )
}
Layout.defaultProps = {
  title: 'Radiant Collections',
  description: 'Online Store for Artifacts and Women Clothes',
  keywords: 'home decor,ethnic,women clothes,crockery,glassware',
  author: 'Ekta Saboo',
}

export default Layout
