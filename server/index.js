const express = require('express');

const app = express();
const router = express.Router();

router.route('/')
  .get((request, response) => {
    response.send('Hello, world');
  });

app.use(router);

app.listen(3000);
