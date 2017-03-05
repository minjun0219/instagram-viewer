import axios from 'axios';

const API_FEED = '/api/feed';
const API_MEDIA = '/api/media';

// Fetch API는 abort가 안되는 문제로 미루어 둠
// https://medium.com/little-big-programming/내가-fetch-api를-쓰지-못했던-이유-3c23f0ec6b82
// https://github.com/whatwg/fetch/issues/27
/*function request() {
  return fetch(API_FEED)
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      throw new Error('Network response was not ok.');
    });
}*/

// Axios로 변경
function request(url) {
  return axios.get(url)
    .then(res => {
      if (res.status === 200 && res.data) {
        return res.data;
      }
      throw new Error('Network response was not ok.');
    })
    .then(({ meta, data }) => {
      if (meta && meta.code === 200 && data) {
        return data;
      }
      throw new Error('Instagram API Error');
    });
}

function requestFeed(userId) {
  if (userId) {
    return request(`${API_FEED}/${userId}`);
  } else {
    return request(API_FEED);
  }
}

function requestMedia(mediaId) {
  return request(`${API_MEDIA}/${mediaId}`);
}

export {
  requestFeed,
  requestMedia
};
