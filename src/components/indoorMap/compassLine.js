let directionValue = ["东", "东南", "南", "西南", "西", "西北", "北", "东北", "东", "东南", "南", "西南", "西"]

export function createIcon() {
  let canvas = document.createElement("canvas")
  let ctx = canvas.getContext("2d")
  let width = document.body.offsetWidth
  let iconSizeX = 7
  let iconSizeY = 5
  ctx.canvas.width = width
  ctx.canvas.height = iconSizeY * 2
  //绘制图标
  ctx.beginPath()
  ctx.moveTo(width / 2 - iconSizeX, 0)
  ctx.lineTo(width / 2 - iconSizeX, iconSizeY)
  ctx.lineTo(width / 2, iconSizeY * 2)
  ctx.lineTo(width / 2 + iconSizeX, iconSizeY)
  ctx.lineTo(width / 2 + iconSizeX, 0)
  ctx.closePath()
  ctx.fillStyle = "#ffffff"
  ctx.fill()
  canvas.style.display = "block"
  return canvas
}

export function createDirection() {
  let canvas = document.createElement("canvas")
  let ctx = canvas.getContext("2d")
  let width = document.body.offsetWidth * 13 / 5
  let height = 25
  let iconSize = 5
  let scale = document.body.offsetWidth / 5
  ctx.canvas.width = width
  ctx.canvas.height = height

  //绘制刻度线和文字
  ctx.beginPath()
  ctx.moveTo(0, height)
  ctx.lineTo(width, height)
  ctx.strokeStyle = "#ffffff"
  ctx.stroke()
  directionValue.forEach(function (item, index) {
    ctx.beginPath()
    ctx.moveTo(scale / 2 + index * scale, height)
    ctx.lineTo(scale / 2 + index * scale, height - iconSize)
    ctx.strokeStyle = "#ffffff"
    ctx.stroke()
    ctx.beginPath()
    ctx.fillStyle = '#ffffff'
    ctx.font = '14px Microsoft YaHei'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(item, scale / 2 + index * scale, (height - iconSize) / 2 )
  })
  canvas.style.display = "block"
  let offset = -scale * 4
  canvas.style.marginLeft = `${offset}px`
  canvas.id = "direction"
  return canvas
}