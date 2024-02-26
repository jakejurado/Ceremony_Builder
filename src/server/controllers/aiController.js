const OpenAI = require ('openai');

const openai = new OpenAI({
  organization: 'org-t2KfUE5lRek2oNEPBKYvzC1R',
  apiKey: process.env.OPENAI_KEY,
});
const aiController = {};

  //grabs all user templates
aiController.writeScript = async (req, res, next) => { 
  const {input} = res.locals.myData
  console.log(input, res.locals.myData)
  const apiUrl = 'https://api.openai.com/v1/chat/completions';

  const requestBody = {
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: input }],
    temperature: 0.7
  };

  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_KEY}`
    },
    body: JSON.stringify(requestBody)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    console.log({response})
    return response.json();
  })
  .then(data => {
    console.log(data);
    res.locals.aiResults = data
  })
  .catch(error => {
    console.error('Error:', error);
  });

};

module.exports = aiController;