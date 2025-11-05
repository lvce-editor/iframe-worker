export const getWebViewHtml = (baseUrl: string, locationOrigin: string, elements: readonly any[], assetDir: string): string => {
  if (!elements) {
    return ''
  }
  const middle: string[] = ['<meta charset="utf-8">']
  for (const element of elements) {
    switch (element.type) {
      case 'title':
        middle.push(`<title>${element.value}</title>`)

        break
      case 'script':
        middle.push(`<script type="module" src="${locationOrigin}${assetDir}/js/preview-injected.js"></script>`)
        middle.push(`<script type="module" src="${locationOrigin}${baseUrl}/${element.path}"></script>`)

        break
      case 'css':
        middle.push(`<link rel="stylesheet" href="${locationOrigin}${baseUrl}/${element.path}" />`)
        break
      default:
        break
    }
  }
  const middleHtml = middle.join('\n    ')
  const html = `<!DOCTYPE html>
<html>
  <head>
    ${middleHtml}
  </head>
</html>
`
  return html
}
