import React, { Component } from 'react'
import "./ResponsiveDrawer.css";

export default class ResponsiveDrawer extends Component {
  render() {
    return (
      <div>
            <input type="checkbox" id="hmt" className="hidden-menu-ticker"/>
            <label className="btn-menu" htmlFor="hmt">
            <span className="first"></span>
            <span className="second"></span>
            <span className="third"></span>
            </label>
            <ul className="hidden-menu">
            <li><a href="">HOME</a></li>
            </ul>
      </div>
    )
  }
}
