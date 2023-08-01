import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import './BreadCrumbs.css'

const BreadCrumb2 = () => {
  const location = useLocation()

  const breadCrumbFunction = () => {
    const { pathname } = location
    const pathnames = pathname.split('/').filter((item) => item)
    const capatilize = (s) => s.charAt(0).toUpperCase() + s.slice(1)

    return (
      <div className="crumb-container">
        <ol className="crumb-list">
          {pathnames.length > 0 ? (
            <li className="crumb-item">
              <Link to="/">Home</Link>
            </li>
          ) : (
            <></>
          )}
          {pathnames.map((name, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`
            const isLast = index === pathnames.length - 1
            return isLast ? (
              <li className="crumb-item" key={index}>
                {name.length > 15 ? (
                  <span>{`${capatilize(name).substring(0, 10)}...`}</span>
                ) : (
                  <span>{capatilize(name)}</span>
                )}
              </li>
            ) : (
              <li className="crumb-item" key={index}>
                <Link to={`${routeTo}`}>{capatilize(name)}</Link>
              </li>
            )
          })}
        </ol>
      </div>
    )
  }

  return <>{breadCrumbFunction()}</>
}

export default BreadCrumb2
