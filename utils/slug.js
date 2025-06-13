const generateSlug = (title) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')   // Enlève les caractères spéciaux
    .replace(/\s+/g, '-')           // Remplace les espaces par des tirets
    .replace(/-+/g, '-');           // Supprime les tirets en double
}

module.exports = generateSlug;