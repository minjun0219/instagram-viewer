import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import { requestMedia } from '../services/request';
import { fitSize } from '../services/size';

import styles from '../assets/scss/viewer.scss';

class Viewer extends Component {

  constructor(props) {
    super(props);

    const { photoId } = props.params;
    const state = props.location.state;

    // initializes component state
    this.state = {
      fetching: false,
      imageLoaded: false,
      viewerClassName: [styles.viewer],
      photoId,
      item: (state && state.item) || {},
      linkRect: (state && state.rect) || null,
      transition: false,
      thumbSize: {}
    };
  }

  // 링크를 클릭하지 않고 주소로 직접 접근 하였을때
  // API에서 사진 정보를 따로 가져온다.
  fetchInstaMedia = async (photoId) => {

    this.setState({
      fetching: true, // requesting...
      imageLoaded: false
    });

    // wait for promises
    try {
      const item = await requestMedia(photoId);
      this.setState({ item, fetching: false });
    } catch(e) {
      this.setState({ fetching: false });
      browserHistory.push('/');
    }
  }

  handleContainerClick = (e) => {
    e.preventDefault();
    this.closeViewer();
  }

  // 웹브라우저가 Resize 될때 호출 함
  handleResize = () => {
    const fit = this.getImageResize();
    this.refs.image.style.width = `${fit.width}px`;
    this.refs.image.style.height = `${fit.height}px`;
    this.refs.image.style.top = `${fit.top}px`;
    this.refs.image.style.left = `${fit.left}px`;

    if (this.state.transition) {
      this.setState({
        transition: false,
        thumbSize: { transition: 'unset' }
      });
    }
  }

  // `standard_resolution`이미지가 로드 될때 화면이 비어있는 현상을 막기 위해
  // Thumb에서 사용되었던 `low_resolution`이미지를 먼저 보여주고
  // `standard_resolution`이미지를 보여주기 위해 Loaded 플래그를 생성
  handleImageLoad = () => {
    this.setState({ imageLoaded: true });
  }

  // Component Mount 이후에 window Resize 이벤트를 바인딩
  bindWindowResize() {
    window.addEventListener('resize', this.handleResize);
    window.addEventListener('orientationchange', this.handleResize);
  }

  // Viewer Component가 Unmount될때 생성됐던 window Resize 이벤트 제거
  unBindWindowResize() {
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('orientationchange', this.handleResize);
  }

  // `standard`/`low` 이미지 정보를 메서드로 호출
  getImage(type = 'standard') {
    const { images } = this.state.item;
    return images && images[`${type}_resolution`];
  }

  // 웹브라우저 리사이즈 값에 따라 이미지 크기를 조정한 값을 반환
  getImageResize() {

    // window size
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // standard image size
    const { width, height } = this.getImage();

    return fitSize(windowWidth, windowHeight, width, height);
  }

  // 클릭된 썸네일에서 커지는 애니메이션 적용
  viewerOpenTransition() {
    if (this.state.transition) {
      const { width, height, left, top } = this.refs.image.getBoundingClientRect();
      this.setState({
        thumbSize: { width, height, left, top },
        viewerClassName: styles.viewer
      });

      // 트랜지션이 완료되면 state 초기화
      const transitionBox = this.refs.transitionBox;
      const transitionEndEvent = () => {
        transitionBox.removeEventListener('transitionend', transitionEndEvent);
        this.setState({
          transition: false
        });
      }
      transitionBox.addEventListener('transitionend', transitionEndEvent);
    }
  }

  closeViewer() {
    browserHistory.push('/');
  }

  // 열릴때 애니메이션 사용을 위해
  // 썸네일 사이즈 값을 미리 설정
  setThumbSize() {
    const { width, height, left, top } = this.state.linkRect;
    this.setState({
      transition: true,
      viewerClassName: `${styles.viewer} ${styles.viewerAni}`,
      thumbSize: { width, height, left, top }
    });
  }

  componentWillMount() {

    // 링크 썸네일 사이즈 정보가 있을 경우
    // 애니메이션 사용을 위해 썸네일 값을 설정
    if (this.state.linkRect.width) {
      this.setThumbSize();
    }
  }

  componentDidMount() {

    // state에 item이 없으면 서버에서 정보 호출
    if (!this.state.item.id) {
      const photoId = this.state.photoId;
      this.fetchInstaMedia(photoId);
    }

    // 링크가 클릭 되었을 경우
    // low 사이즈 이미지를 먼저 보여주고 standard 사이즈가 로드되었을 경우
    // 교체 하고, 열릴때 애니메이션 사용
    else {

      // open animation
      this.viewerOpenTransition();
    }

    // resize event
    this.bindWindowResize();
  }

  componentWillUnmount() {
    this.unBindWindowResize();
    this.setState({ imageLoaded: false });
    document.body.style.overflow = '';
  }

  // 이미지를 트랜지션 할때 사용됨
  renderTransitionBox(low_url) {
    const style = {
      ...this.state.thumbSize,
      backgroundImage: `url(${low_url})`
    }
    return (
      <div
        style={style}
        className={styles.imageAni}
        ref="transitionBox"
      />
    );
  }

  // Viewer
  renderViewer() {

    // disable scrolling
    document.body.style.overflow = 'hidden';

    // caption
    const { caption } = this.state.item;

    // image url
    const { url: low_url } = this.getImage('low');
    const { url } = this.getImage('standard');

    // image size
    const { width, height, top, left } = this.getImageResize();
    const style = {
      top, left,
      width, height,
      opacity: this.state.transition ? '0' : '1'
    };

    return (
      <div className={this.state.viewerClassName}>
        <div className={styles.viewerWrap} ref="wrap" onClick={this.handleContainerClick}>
          <img
            alt={caption.text}
            src={this.state.imageLoaded ? url : low_url}
            onLoad={this.handleImageLoad}
            style={style}
            className={styles.imageBox}
            ref="image"
          />
        </div>
        {/* <Thumb/>에서 링크를 타고 왔을 경우 애니메이션 적용 */}
        {this.state.transition && this.renderTransitionBox(low_url)}
      </div>
    );
  }

  render() {

    // standard image
    const { images } = this.state.item;

    return images && this.renderViewer();
  }

}

export default Viewer;
