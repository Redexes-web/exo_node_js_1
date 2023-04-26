require('dotenv').config();
const cors = require('cors');

const app = require('./app');
const port = process.env.PORT;
const corsOptions = {
    origin: 'http://localhost:8080',
  };
  app.use(cors(corsOptions));
app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
