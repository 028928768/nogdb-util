const ComponentScale = {
    isFullscreen : false
}

const rescaleReducer = (state = ComponentScale,action) => {
    switch(action.type){
        case 'SETFULLSCREEN':
        return  {
            ...state,
            isFullscreen:true
          }
          break;
        
        case 'EXITFULLSCREEN':
        return  {
              ...state,
              isFullscreen:false
            }
            break;



        default:
            state = {
              ...state
            }
            return state;
            break;
    }
}
export default rescaleReducer;