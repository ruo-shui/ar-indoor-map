export let landmarkCoo1 = [
  {
    name: "厕所",
    pic: "厕所.png",
    x: 13439318.841327073,
    y: 3667214.8216214017,
    height:90
  },
  {
    name: "楼梯",
    pic: "楼梯.png",
    x: 13439360.812949382,
    y: 3667235.617727969,
    height:90
  },
  {
    name: "软件部",
    pic: "办公区.png",
    x: 13439329.7495706,
    y: 3667224.43096216,
    height:45
  },
  {
    name: "硬件部",
    pic: "办公区.png",
    x: 13439344.050809639,
    y:  3667229.27533807,
    height:45
  }
]

export let landmarkCoo2 = [
  {
    name: "厕所",
    pic: "厕所.png",
    x: 13237066.920947641,
    y: 3778702.8825714635,
    height:90
  },
  {
    name: "厕所",
    pic: "厕所.png",
    x: 13237151.780315474,
    y: 3778674.672081741,
    height:45
  },
  {
    name: "楼梯",
    pic: "楼梯.png",
    x: 13237107.908749536,
    y: 3778690.452003495,
    height:90
  },
  {
    name: "楼梯",
    pic: "楼梯.png",
    x: 13237109.975803955,
    y: 3778662.6941257464,
    height:45
  }
]

export function getCanvas(name, distance, imgName) {
  let canvas = document.createElement('canvas')
  let ctx = canvas.getContext("2d")
  let width = 120
  let height = 45
  ctx.canvas.width = width
  ctx.canvas.height = height
  /*4.画一个十字架在画布的中心*/
  ctx.beginPath()
  ctx.moveTo(0, height / 2 - 0.5)
  ctx.lineTo(width, height / 2 - 0.5)
  // ctx.moveTo(width / 2 - 0.5, 0)
  // ctx.lineTo(width / 2 - 0.5, height)
  ctx.strokeStyle = '#eee'
  ctx.stroke()
  //绘制图片
  let img = new Image()
  img.onload = function () {
    ctx.drawImage(img, 0, 0, height, height)
  }
  img.src = require("@/assets/img/landmark/" + imgName)
  //绘制名称
  ctx.beginPath()
  ctx.fillStyle = '#ffffff'
  ctx.font = '16px Microsoft YaHei'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(name, (width - height) / 2 + height, height / 4 + 2)
  //绘制距离
  ctx.beginPath()
  ctx.fillStyle = '#ffffff'
  ctx.font = '12px Microsoft YaHei'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText("距离" + distance + "m", (width - height) / 2 + height, height * 3 / 4)
  return canvas
}
