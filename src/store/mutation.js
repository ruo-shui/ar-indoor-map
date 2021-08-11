const mutations ={
  switchNav(state){
    if(state.isNavShow===true||state.isNavBoxShow===true){
      state.isNavShow = false
      state.isNavBoxShow = false
    }else{
      state.isNavBoxShow = true
    }
  },
  switchNavButton(state){
    state.isNavShow = true
  },
  switchNavBox(state){
    state.isNavBoxShow = !state.isNavBoxShow
  },
  startPointSelectTrue(state){
    state.startPointSelect = true
  },
  startPointSelectFalse(state){
    state.startPointSelect = false
  },
  endPointSelectTrue(state){
    state.endPointSelect = true
  },
  endPointSelectFalse(state){
    state.endPointSelect = false
  },
  switchArComponent(state){
    state.arComponentShow = !state.arComponentShow
  },
  getCoordinates(state,coordinates){
    state.coordinates = coordinates
  }
}

export default mutations

