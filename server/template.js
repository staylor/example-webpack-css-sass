export default ({ html, assets, css }) => {
  return `<!DOCTYPE html>
<html>
<head>
<title>Hello World: Hot Reload</title>
${assets['main.css'] ? `<link rel="stylesheet" href="${assets['main.css']}" />` : ''}
${css ? `<style>${css}</style>` : ''}
</head>
<body>
<div id="root">${html}</div>
</body>
${assets['vendor.js'] ? `<script src="${assets['vendor.js']}"></script>` : ''}
${assets['manifest.js'] ? `<script src="${assets['manifest.js']}"></script>` : ''}
${assets['main.js'] ? `<script src="${assets['main.js']}"></script>` : ''}
</html>`;
};
