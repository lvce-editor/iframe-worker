export const getWebViewHtml = (baseUrl: string, locationOrigin: string, elements: readonly any[], assetDir: string): string => {
  if (!elements) {
    return ''
  }
  const middle: string[] = []
  middle.push('<meta charset="utf-8">')
  for (const element of elements) {
    if (element.type === 'title') {
      middle.push(`<title>${element.value}</title>`)
    } else if (element.type === 'script') {
      middle.push(`<script type="module" src="${locationOrigin}${assetDir}/js/preview-injected.js"></script>`)
      middle.push(`<script type="module" src="${locationOrigin}${baseUrl}/${element.path}"></script>`)
    } else if (element.type === 'css') {
      middle.push(`<link rel="stylesheet" href="${locationOrigin}${baseUrl}/${element.path}" />`)
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
