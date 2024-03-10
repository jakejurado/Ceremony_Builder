const OpenAI = require ('openai');

const openai = new OpenAI({
  organization: 'org-t2KfUE5lRek2oNEPBKYvzC1R',
  apiKey: process.env.OPENAI_KEY,
});
const aiController = {};

  //grabs all user templates
aiController.writeScript = async (req, res, next) => { 
  const {input} = res.locals.myData

  try{
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: input }],
      model: "gpt-3.5-turbo",
    });
  
    res.locals.aiResults = {ok: completion.choices[0]}
    next();
  } catch(err){
    res.locals.error = {error: err}
    next();
  }

};

module.exports = aiController;

