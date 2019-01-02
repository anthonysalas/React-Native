export const validation ={
email: {
  presence: {
    message: 'Please input Email Address'
  },
  format:{
    pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    message:  'Not correct format for email address'
  }
},
password: {
   presence: {
    message: 'Please input Password'
  },
  length:{
    minimum: {
     val: 5,
     message: 'Please use atleast 6 - 12 characters'
    },
    maximum: {
      val: 12,
      message: 'Please use atleast 6 - 12 characters'
    }
  }
},
disablebutton: {
  disable:{
    disablebutton: true
  }
}

}

export function validate(nameField, value,disable){
  let resp = [null,null];
  if(validation.hasOwnProperty(nameField)){
    let v = validation[nameField]
    if(value=='' || value==null){
      resp[0] = false
      resp[1] = v['presence']['message']
      resp[2] = true
    }else if(v.hasOwnProperty('format') && !v['format']['pattern'].test(value)){
      resp[0] = false
      resp[1] = v['format']['message']
      resp[2] = true
    }else if(v.hasOwnProperty('length')){
      let l = v['length'];
      if(l.hasOwnProperty('minimum') && value.length<l['minimum']['val'] || l.hasOwnProperty('maximum') && value.length>l['maximum']['val'] ){
        resp[0] = false
        resp[1] = l['minimum']['message']
        resp[2] =true
    }else{
      resp[0] = true;
      resp[2] = false
    }
  }else{
   
    resp[0] =true
    resp[2] =false
  }
  return resp;
}
}


