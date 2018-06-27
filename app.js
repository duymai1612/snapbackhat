const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000

require('./server/express')(app);
require('./server/router')(app);

app.listen(PORT, () => { console.log('Server running on port 5000')});