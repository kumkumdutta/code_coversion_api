const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config(); // Load environment variables from .env file
const cors = require('cors')
const app = express();
const PORT = process.env.PORT || 8000;
app.use(cors())
app.use(express.json());

// Endpoint to handle code conversion
app.get("/",(req,res)=>{
  res.send("hello")
})
app.post('/convert', async (req, res) => {
  const { code, fromLanguage, toLanguage } = req.body;

  if (!code || !fromLanguage || !toLanguage) {
    return res.status(400).json({ error: 'Invalid request. Please provide code, fromLanguage, and toLanguage.' });
  }

  try {
    const GPT_API_KEY = process.env.CHATGPT_API_KEY;

    // Call the ChatGPT API to convert code
    const response = await axios.post(
      'https://api.openai.com/v1/engines/text-davinci-003/completions',
      {
        prompt: `Convert this ${fromLanguage} code to ${toLanguage}: ${code}`,
        max_tokens: 150,
      },
      {
        headers: {
          Authorization: `Bearer ${GPT_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const convertedCode = response.data.choices[0].text.trim();
    res.json({ convertedCode });
  } catch (error) {
    console.error('Error converting code:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
    }
    res.status(500).json({ error: 'Failed to convert code' });
  }
});
app.post('/debug', async (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ error: 'Invalid request. Please provide code, fromLanguage, and toLanguage.' });
  }

  try {
    const GPT_API_KEY = process.env.CHATGPT_API_KEY;

    // Call the ChatGPT API to convert code
    const response = await axios.post(
      'https://api.openai.com/v1/engines/text-davinci-003/completions',
      {
        prompt: `Debug this ${code}`,
        max_tokens: 150,
      },
      {
        headers: {
          Authorization: `Bearer ${GPT_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const convertedCode = response.data.choices[0].text.trim();
    res.json({ convertedCode });
  } catch (error) {
    console.error('Error converting code:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
    }
    res.status(500).json({ error: 'Failed to convert code' });
  }
});
app.post('/check', async (req, res) => {
  const { code, fromLanguage, toLanguage } = req.body;

  if (!code) {
    return res.status(400).json({ error: 'Invalid request. Please provide code, fromLanguage, and toLanguage.' });
  }

  try {
    const GPT_API_KEY = process.env.CHATGPT_API_KEY;

    // Call the ChatGPT API to convert code
    const response = await axios.post(
      'https://api.openai.com/v1/engines/text-davinci-003/completions',
      {
        prompt: `Check the quality of ${code}`,
        max_tokens: 150,
      },
      {
        headers: {
          Authorization: `Bearer ${GPT_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const convertedCode = response.data.choices[0].text.trim();
    res.json({ convertedCode });
  } catch (error) {
    console.error('Error converting code:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
    }
    res.status(500).json({ error: 'Failed to convert code' });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
