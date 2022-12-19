module.exports.slug = (name) => {
  slug = name.toLowerCase();
  slug = slug.replaceAll(" ", "_");
  slug = slug.replaceAll(/[éèêë]/g, "e");
  slug = slug.replaceAll(/[àäâ]/g, "a");
  return slug;
};
