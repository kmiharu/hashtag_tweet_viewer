// Sanitaize
const sanitaize = {
  // sanitaizing
  encode: (str) => {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  },
  // Undo
  decode: (str) => {
    return str.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, '\'').replace(/&amp;/g, '&');
  }
};

export default sanitaize;