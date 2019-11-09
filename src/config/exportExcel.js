//get请求下载导出excel文件
const downloadGet = (config) => {
  const params = []
  for (const item in config.params) {
      params.push(`${item}=${config.params[item]}`)
  }
  const url = params.length ? `${config.url}?${params.join('&')}` : `${config.url}`
  let iframe = document.createElement('iframe')
  iframe.style.display = 'none'
  iframe.src = url
  iframe.onload = function () {
      document.body.removeChild(iframe)
  }
  document.body.appendChild(iframe)
}

const downloadPost = (config) => {
  console.log(111111111)
  const url = config.url
  const data = JSON.parse(config.data)
  const form = document.createElement('form')
  form.action = url
  form.method = 'post'
  form.style.display = 'none'
  Object.keys(data).forEach(key => {
    const input = document.createElement('input')
    input.name = key
    input.value = data[key]
    form.appendChild(input)
  })
  const button = document.createElement('input')
  button.type = 'submit'
  form.appendChild(button)
  document.body.appendChild(form)
  form.submit()
  document.body.removeChild(form)
}
export {downloadGet,downloadPost}