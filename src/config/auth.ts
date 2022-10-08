export default {
  jwt: {
    secret: process.env.APP_SECRET || 'segredãodemais',
    expiresIn: '1d',
  },
};
