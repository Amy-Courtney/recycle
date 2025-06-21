const express = require('express');
const app = express();
const dirtRoutes = require('./routes/dirt');

app.use('/api/dirt', dirtRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});