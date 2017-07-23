const axios = require('axios');

const colors = [
  'red', 'orange', 'yellow', 'olive', 'green', 'teal',
  'blue', 'violet', 'purple', 'pink', 'brown', 'grey', 'black'
]; 

module.exports.getAll = (req, res) => {
  const authString = 'Bearer ' + req.session.nylasToken;
  axios.get(`https://api.nylas.com/messages/search?q=${Object.keys(req.res.req.body)[0]}`, {
    headers: { Authorization: authString }
  })
  .then(response => {
    for (let i = 0; i < response.data.length; i++) {
      response.data[i].color = colors[Math.floor(Math.random() * 12)];
    }
    res.status(201).send(response.data);
  }).catch(err => { 
    res.status(500);
    console.log('Error retrieving search results from Nylas ', err); 
  });
};
