const express = require('express');
const studentRoutes= require('./routes/studentController');

const app = express();
const  PORT = 3000;

app.use('/api/students', studentRoutes);
    
app.listen(PORT, (err,res) => {
    console.log(`Server is running on port ${PORT}`);
})