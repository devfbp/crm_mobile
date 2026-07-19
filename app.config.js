export default {
  expo: {
    name: "FBP",
    slug: "FBP",

    plugins: [
      "expo-secure-store",
    ],

    android: {
      package: "com.fullbasketproperty.fbp"
    },
    
    extra: {
      BASE_URL: process.env.BASE_URL,
      API_URL: process.env.API_URL,
      TOKEN_KEY: process.env.TOKEN_KEY,
      BEARER_TOKEN: "Bearer " + process.env.BEARER_TOKEN,

      eas: {
        projectId: "e9f6dcb3-48a8-4670-8bf0-4903bb752e1d",
      },
    },
  },
};