const mutations ={
  switchNav(state){
    state.isNavShow = !state.isNavShow
  },
  getCoordinates(state,coordinates){
    state.coordinates = coordinates
  }
}

export default mutations

