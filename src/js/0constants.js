const IMG_URL = 'https://image.tmdb.org/t/p/w500/';
// const API_KEY = 'ca745db198ca3fbe8342f07480e09405';
const API_KEY = 'dac085ebfb43a8420c2afb30acca851a';

const IMAGE_NOT_FOUND =
  'https://c4.wallpaperflare.com/wallpaper/198/872/888/numbers-404-not-found-simple-background-minimalism-wallpaper-preview.jpg';
const Version = {
  REGULAR: 'regular',
  PRO: 'pro',
};

const options = {
  method: 'GET',
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    'Content-Type': 'application/json',
    'Accept-Charset': 'utf-8',
  },
};