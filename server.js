require('dotenv/config.js')
const app = require('./src/app.js')

// const https = require('https');
// const fs = require('fs');

//  const httpsOptions = {
//     key: fs.readFileSync('/etc/letsencrypt/live/taiacupeba.com.br/privkey.pem'),
//     cert: fs.readFileSync('/etc/letsencrypt/live/taiacupeba.com.br/fullchain.pem')
// }; 

// const server = https.createServer(httpsOptions,app);


const PORT = 3000;

app.listen(PORT,()=>{
    console.log('Servidor Escutando na porta: '+ PORT);
});