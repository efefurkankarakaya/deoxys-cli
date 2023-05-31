exports.sanitizeTitle = (text) => {
  return text.replace(/[^\p{L}\p{N}\p{P}\p{Z}^$\n]/gu, '');
}