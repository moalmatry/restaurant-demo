export default {
  environment: 'development',
  port: 7000,
  email: 'maadirestate@gmail.com',
  password: '',
  // mongodb+srv://moalmatry2000:<db_password>@cluster0.l5syt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
  dbUrl: 'mongodb+srv://moalmatry2000:ypYOGbnxfVzt3ToQ@cluster0.l5syt.mongodb.net/demo',
  logLevel: 'info',
  accessTokenPrivateKey: '',
  refreshTokenPrivateKey: '',
  emailForm: 'Mohamed Almatry <maadirestate@gmail.com>',
  // smtp: {
  //   user: 'irku6kreukzst6co@ethereal.email',
  //   pass: '1wHKyGcYWB7Bv3qKEv',
  //   host: 'smtp.ethereal.email',
  //   port: 587,
  //   secure: false,
  // },
  smtp: {
    service: 'gmail',
    user: 'maadirestate@gmail.com',
    pass: 'tyezuujohlbmvljj',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
  },
};
