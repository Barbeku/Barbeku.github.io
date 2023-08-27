function drag(query = '.draggblejs', rotate = false, transition = '0'){
  let draggbleBlock = document.querySelector(query)
  let style = draggbleBlock.style
  style.transition = `transform ${transition}`
  style.userSelect = 'none'
  style.position = 'absolute'

  draggbleBlock.addEventListener('mousedown', event => {
    let isMouseDown = true
    let relX = event.offsetX
    let relY = event.offsetY
    if(rotate){
      style.transform = `rotate(${rotate}deg)`
    }

    document.addEventListener('mouseup', event => {
      style.transform = `rotate(0deg)`
      isMouseDown = false
    })

    document.addEventListener('mousemove', event => {
      if(!isMouseDown) return;
      style.left = (event.clientX - relX) + 'px'
      style.top = (event.clientY - relY) + 'px'
    })
  })
}
