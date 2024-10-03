const express = require('express');
const axios = require('axios');
const querystring = require('querystring');

const app = express();
app.use(express.json());

app.post('/send-to-zeno', async (req, res) => {
  try {
    // Convert JSON to x-www-form-urlencoded
    const formData = querystring.stringify(req.body);

    // Send data to Zeno Africa API
    const response = await axios.post('https://api.zeno.africa/', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    // Send the response from Zeno Africa back to the client
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'An error occurred while processing your request' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});