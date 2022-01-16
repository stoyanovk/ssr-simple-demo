export const renderHTML = ({ app, state, chunkExtractor }) => {
  const scriptTags = chunkExtractor.getScriptTags()
  const linkTags = chunkExtractor.getLinkTags()
  const styleTags = chunkExtractor.getStyleTags()
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Server side simple</title>
        ${linkTags}
        ${styleTags}
      </head>
      <body style="background-color: #eee">
        <div id="root">${app}</div>
        <script>
          window.__INITIAL_STATE__=${state};
        </script>
        ${scriptTags}
      </body>
    </html>
    `
}
