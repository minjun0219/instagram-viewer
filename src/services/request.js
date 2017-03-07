import axios from 'axios';

const API_FEED = '/api/feed';
const API_MEDIA = '/api/media';

// Axios
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

// Media Feed
function requestFeed(userId) {
  if (userId) {
    return request(`${API_FEED}/${userId}`);
  } else {
    return request(API_FEED);
  }
}

// 개별 Media
function requestMedia(mediaId) {
  return request(`${API_MEDIA}/${mediaId}`);
}

export {
  requestFeed,
  requestMedia
};
