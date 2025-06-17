const express = require('express');
const app = express();
const PORT = 8000;
require('dotenv').config

app.use(express.json());
const KudosRoutes = require('./Routes/KudosRoutes')
app.use('/Kudos_Board',KudosRoutes)

app.listen(PORT, () => console.log(`Example app listening on port http://localhost:${PORT}`));
