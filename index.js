const express = require('express');
const app = express();
const PORT = 3000;

app.use('/Kudos_Board',KudosRoutes)

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
