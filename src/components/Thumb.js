import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';

import styles from '../assets/scss/thumb.scss';

const propTypes = {
  item: PropTypes.object
};

const defaultProps = {
  item: {}
};

class Thumb extends Component {

  handleClick = (e) => {
    e.preventDefault();
    const rect = e.target.getBoundingClientRect();
    const shortCode = this.getItemShortCode();
    browserHistory.push({
      pathname: `/p/${shortCode}/`,
      state: {
        item: this.props.item,
        rect
      }
    });
  }

  // 사진 Route 주소로 사용하기 위해
  // Instagram ShortCode를 URL Link에서 Parsing
  // API 명세에는 따로 제공되지 않음.
  getItemShortCode() {
    const { link } = this.props.item;
    return link.match(/\/p\/(.+)\//)[1];
  }

  render() {
    const { images, caption } = this.props.item;
    const { url } = images.low_resolution;

    const shortCode = this.getItemShortCode();

    const style = {
      backgroundImage: `url(${url})`
    };

    const linkState = {
      item: this.props.item
    };

    return (
      <div className={styles.thumb}>
        <Link
          to={{ pathname: `/p/${shortCode}/`, state: linkState }}
          onClick={this.handleClick}
          className={styles.thumbBox}
          style={style}
          ><span>{caption.text}</span></Link>
      </div>
    );
  }

}

Thumb.propTypes = propTypes;
Thumb.defaultProps = defaultProps;

export default Thumb;
