module.exports = async function aiHelper(prompt, codeType='html') {
  // Use OpenAI/Copilot/LLMs or custom codegen api
  if (codeType === 'html') {
    // Simple HTML site
    return `<html><body><h1>${prompt}</h1></body></html>`;
  }
  if (codeType === 'python') {
    return `print("Website says: ${prompt}")`;
  }
  // ...other types (images/text)
  return `Site: ${prompt}`;
};