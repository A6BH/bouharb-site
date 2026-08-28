const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// `extensions: ['html']` makes /privacy serve privacy.html. Without it only the
// exact /privacy.html matched, and the catch-all below quietly answered /privacy
// with the LANDING PAGE and a 200 — so a store reviewer clicking an
// extension-less privacy link saw the marketing page and no error.
app.use(express.static(path.join(__dirname), { extensions: ['html'] }));

// Unknown paths used to render index.html with a 200. That is SPA behaviour and
// this is a static site with no client-side routing, so it only served to make
// every typo look like a working page. Redirect instead: no dead ends, but the
// URL visibly changes so nothing masquerades as real content.
app.use((req, res) => {
  res.redirect(302, '/');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
