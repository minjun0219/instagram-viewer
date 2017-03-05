import React, { Component } from 'react';
import Thumb from './Thumb';

import { requestFeed } from '../services/request';

import gridStyle from '../assets/scss/thumbgrid.scss';
import spinerStyle from '../assets/scss/spinner.scss';

class ThumbGrid extends Component {

  constructor(props) {
    super(props);

    // initializes component state
    this.state = {
      userId: props.params.userId || null,
      data: [],
      fetching: false // tells whether the request is waiting for response or not
    };
  }

  // Instagram Media Feed API 호출
  fetchInstaFeed = async () => {

    this.setState({
      fetching: true // requesting...
    });

    // wait for promises
    try {
      const data = await requestFeed(this.state.userId);
      this.setState({ data, fetching: false });
    } catch(e) {
      this.setState({ fetching: false });
    }
  }

  componentDidMount() {
    this.fetchInstaFeed();
  }

  render() {
    const { data, fetching } = this.state;
    const thumbItems = data.map((item) => {
      return (<Thumb
          key={item.id}
          item={item}
        />);
    });

    // API가 완전 로드 되기 전에 보여 줄 Loading Spinner
    const loading = (
      <div className={spinerStyle.loading}>
        <div className={spinerStyle.spinner}>
          <div className={spinerStyle.doubleBounce1}></div>
          <div className={spinerStyle.doubleBounce2}></div>
        </div>
      </div>
    );

    return (
      <div>
        <section className={gridStyle.thumbGrid}>{fetching ? loading : thumbItems}</section>
        {this.props.children}
      </div>
    );
  }

}

export default ThumbGrid;
