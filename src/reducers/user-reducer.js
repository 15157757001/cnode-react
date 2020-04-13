import { getCollectByLoginname } from '../api/data'


const user  ={
  token:'', 
  avatar_url:'',
  loginname:'',
  id:111,
  isRegister:false,
  collect:[]
}


export const addToUser = (info)=>{
  return{
    type: 'ADD_TO_USER',
    payload: info,
  }
}

export const quitOutUser = ()=>{
  return{
    type: 'QUIT_OUT_USER'
  }
}

export const getCollect = (loginname)=>{
  return async dispatch => {
    try{
      let result = await getCollectByLoginname(loginname)
      return dispatch({
        type: 'GET_COLLECT',
        payload: result.data.data
      })
    }catch(err){
      console.error(err)
    }
  }

}

export const userReducer = (state = user , action) => {
  switch (action.type) {
    case 'ADD_TO_USER':
      return {
        ...state,
        ...action.payload,
        isRegister:true
      }
    case 'QUIT_OUT_USER':
      return {
        ...state,
        avatar_url:'',
        loginname:'',
        id:'',
        token:'',
        isRegister:false
      }
    case 'GET_COLLECT':
      return {
        ...state,
        collect:action.payload
      }
    default:
      return state;
    }
}