import 'dotenv/config';

export default {
  expo: {
    extra: {
      API_URL: process.env.GEMINI_API_KEY,
    }
  }
};
