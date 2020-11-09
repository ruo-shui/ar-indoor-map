/**
 * 打开摄像头
 */
export default function () {
  if (navigator.mediaDevices.getUserMedia || navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia) {
    //调用用户媒体设备, 访问摄像头
    // video:{ 'facingMode': "user" }//调用前置摄像头
    // video: { facingMode: { exact: "environment" } }//后置
    // getUserMedia({video: { 'facingMode': "user" }}, success, error)
    getUserMedia({video: {facingMode: {exact: "environment"}}}, success, error)

  } else {
    alert('不支持访问用户媒体')
  }
}

//访问用户媒体设备的兼容方法
function getUserMedia(constraints, success, error) {
  if (navigator.mediaDevices.getUserMedia) {
    //最新的标准API
    navigator.mediaDevices.getUserMedia(constraints).then(success).catch(error)
  } else if (navigator.webkitGetUserMedia) {
    //webkit核心浏览器
    navigator.webkitGetUserMedia(constraints, success, error)
  } else if (navigator.mozGetUserMedia) {
    //firfox浏览器
    navigator.mozGetUserMedia(constraints, success, error)
  } else if (navigator.getUserMedia) {
    //旧版API
    navigator.getUserMedia(constraints, success, error)
  }
}

//调用成功
function success(stream) {
  let video = document.getElementById('ARModuleCameraVideo')
  video.srcObject = stream
  video.play()
}

//调用失败
function error(error) {
  console.log(`访问用户媒体设备失败${error.name}, ${error.message}`)
}