import axios from 'axios';

const ACCESS_KEY = 'SWDc7mujCfg9Nkb-PmhHSgyUconIpKlvM5arVkmA48k';

export const fetchArticles = async (page = 1, query) => {
  const { data } = await axios.get(
    `https://api.unsplash.com/search/photos?client_id=${ACCESS_KEY}&page=${page}&query=${query}`
  );

  return data;
};