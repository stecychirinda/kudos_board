const express = require('express');
const app = express();
const PORT = 8000;
require('dotenv').config()
const cors = require('cors')
const KudosRoutes = require('./Routes/KudosRoutes')

app.use(cors())
app.use(express.json());
app.use('/Kudos_Board',KudosRoutes)

app.listen(PORT, () => console.log(`Example app listening on port http://localhost:${PORT}`));
