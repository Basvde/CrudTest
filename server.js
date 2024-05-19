const express = require('express');
const path = require('path'); // Importeer de 'path' module

const app = express();
const port = 3003;

// Specificeer het pad naar de public map binnen de frontend map
app.use(express.static(path.join(__dirname, 'frontend', 'public')));

// Route handler voor de root URL
app.get('/', (req, res) => {
    
    
    // Of doorsturen naar een specifieke pagina, bijv. index.html
    res.redirect('/index.html');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
