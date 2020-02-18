import React from 'react'

const Summary = ({ data }) => {
  return (
    <div className="summary">
      <h2>Analyzed page:</h2>
      <img
        className="screenshot"
        src="./screenshot.png"
        alt="screenshot of website"
      />
      <div></div>

      <div>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Bundle name</th>
              <th>Size (kb)</th>
              <th>Coverage</th>
            </tr>
          </thead>
          <tbody>
            {data.children
              .sort((a, b) => {
                return b.realSize - a.realSize
              })
              .map((node, i) => {
                return (
                  <tr>
                    <td>{i + 1}</td>
                    <td>{node.name}</td>
                    <td>{Math.ceil(node.realSize / 1000)}</td>
                    <td>{Math.floor(node.averageCoverage * 100)}%</td>
                  </tr>
                )
              })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

Summary.propTypes = {}

export default Summary
