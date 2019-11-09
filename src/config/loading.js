import { Loading } from 'element-ui'
let loading
function startLoading() {
loading = Loading.service({
lock: true,
text: 'Loading......',

background: 'rgba(255, 255, 255, 0.6)'
   })
}
 
function endLoading() {
 loading.close()
}


let needLoadingRequestCount = 0
 
export function showFullScreenLoading() {
 if (needLoadingRequestCount === 0) {
  startLoading()
 }
 needLoadingRequestCount++
}
 
export function tryHideFullScreenLoading() {
 if (needLoadingRequestCount <= 0) return
 needLoadingRequestCount--
 if (needLoadingRequestCount === 0) {
  endLoading()
 }
}