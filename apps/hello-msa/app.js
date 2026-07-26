const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  // 환경변수로 어떤 환경(Dev/Prod)인지 받아와서 화면에 출력합니다.
  const envName = process.env.ENV_NAME || 'Local (No Env)';
  res.send(`<h1>Hello MSA GitOps! 🚀</h1><p>현재 배포된 환경: <b>${envName}</b></p>`);
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
