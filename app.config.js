import 'dotenv/config';

export default {
  expo: {
    name: "FBP",
    slug: "FBP",
    extra: {
        BASE_URL: process.env.BASE_URL,
        API_URL: process.env.API_URL,
        TOKEN_KEY: process.env.TOKEN_KEY,
        BEARER_TOKEN: "Bearer " + process.env.BEARER_TOKEN,
    },
  },
};