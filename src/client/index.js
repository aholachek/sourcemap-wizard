import 'sanitize.css'
import './index.scss'
import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import Treemap from './Treemap'
import Breadcrumbs from './Breadcrumbs'
import Summary from './Summary'
import Tooltip from './Tooltip'

const findBranch = (id, data) => {
  let cachedBranch
  const inner = branch => {
    if (cachedBranch) return
    if (branch.id === id) cachedBranch = branch
    if (branch.children) branch.children.forEach(inner)
  }
  inner(data)
  return cachedBranch
}

const Dashboard = () => {
  const [data, _setData] = React.useState()
  const [hovered, setHovered] = React.useState(null)
  const [showSummary, setShowSummary] = React.useState(false)
  const [topLevelData, setTopLevelData] = React.useState({})

  const setData = data => {
    _setData(data)
    setHovered(null)
  }

  const setGraphRoot = id => {
    setData(findBranch(id, topLevelData))
  }
  useEffect(() => {
    fetch('./treeData.json').then(response => {
      response.json().then(data => {
        // order is important here for setGraphRoot
        setTopLevelData(data)
        setData(data)
      })
    })
  }, [])
  if (!data) return <div className="loading">loading...</div>

  return (
    <div>
      <Tooltip hovered={hovered} />
      <nav className="nav">
        <div className="logo">
          🧙‍♂&nbsp;Analysis of <b>{(topLevelData || {}).url}</b>
        </div>
        <ul>
          <li></li>
          <li className={!showSummary && 'active'}>
            <a
              href="#"
              onClick={e => {
                e.preventDefault()
                e.stopPropagation()
                setShowSummary(false)
              }}
            >
              🌲&nbsp;Treemap
            </a>
          </li>
          <li className={showSummary && 'active'}>
            <a
              href="#"
              onClick={e => {
                e.preventDefault()
                e.stopPropagation()
                setShowSummary(true)
              }}
            >
              ℹ️&nbsp;Summary
            </a>
          </li>
        </ul>
      </nav>
      {showSummary ? (
        <Summary data={topLevelData} />
      ) : (
        <>
          <Breadcrumbs
            data={data}
            setGraphRoot={setGraphRoot}
            hovered={hovered}
          />
          <Treemap
            data={data}
            setGraphRoot={setGraphRoot}
            setHovered={setHovered}
          />
        </>
      )}
    </div>
  )
}

ReactDOM.render(<Dashboard />, document.getElementById('container'))