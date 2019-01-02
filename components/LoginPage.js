//Created By: Anthony Pocholo Salas
//Email: anthonysalas232@gmail.com
import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TextInput, Dimensions,TouchableOpacity,Button,CheckBox,AsyncStorage,Input} from 'react-native';
import { AntDesign,MaterialCommunityIcons } from '@expo/vector-icons';
import LogoImage from '../assets/Logo.png';
import {validate} from '../ValidationFolder/validation.js';
const {width: WIDTH} = Dimensions.get('window')

export default class LoginForm extends React.Component<Props> {
  constructor(props){
    super(props);
    this.state = {
      emailenter:null,
      enterError:false,
      enterErrorMessage: '',
      passwordenter: null,
      passwordError: false,
      passwordErrorMessage: '',
      disablebutton: false,
      CheckBox: false,
      
}
 }



RememberMe = async() => {
  this.setState({
    CheckBox: !this.state.CheckBox
  })
  const {emailenter,passwordenter} = this.state;
 
  if(!this.state.CheckBox){ 
    let objJson = {name: emailenter, password: passwordenter}
    AsyncStorage.setItem('saveRecord',JSON.stringify(objJson));
    try{
      let recoSave = await AsyncStorage.getItem('saveRecord');
      let parsed =   JSON.parse(recoSave);
      alert('Email: '+parsed.name+'   '+'Password: '+parsed.password)
    }catch(error){
      alert(error);
    }
  }else if(this.state.CheckBox){
    try{
      let recoSave = await AsyncStorage.removeItem('saveRecord');
      let parsed =   JSON.parse(recoSave);
      alert('Remember Email and Password is Unchecked')
      }
      catch(error){
        alert(error)
      }
      
  }

}

submit = () => {
const {emailenter,passwordenter,passwordErrorMessage,enterErrorMessage,CheckBox} = this.state;
let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
 if(passwordenter !=null && emailenter != null && CheckBox == false){
         if(passwordenter.length >5 && passwordenter.length <12 && reg.test(emailenter)===true){
           this.setState({emailenter: null});
           this.setState({passwordenter: null});
           alert('Successfullly Login');
         }
  }else if(passwordenter !=null && emailenter != null && CheckBox == true){
        if(passwordenter.length >5 && passwordenter.length <12 && reg.test(emailenter)===true){
           alert('Successfullly Login');
        }
  }

  
 if(passwordenter !=null && emailenter != null && CheckBox == true){
    if(passwordenter.length >5 && passwordenter.length <12 && reg.test(emailenter)===true){
          alert('Successfullly Login');
         }
 }
 if(passwordenter == null){
      this.setState({passwordErrorMessage: 'Please input Password'}) 
  }
 if(emailenter ==null){
    this.setState({enterErrorMessage: 'Please input Email Address'})
  }
 if(emailenter ==null && passwordenter == null){
    this.setState({enterErrorMessage: 'Please input Email Address',passwordErrorMessage: 'Please input Password'})
  }


}

  render() {

  return (
 <View style={styles.container}>
          <View id='LogoContainer'>
                    <Image  style={styles.logo} source={LogoImage} />
          </View>

          <View id='InputContainer'>
          <Text style={styles.inputEmailText}>Email</Text>
          <TextInput placeholderTextColor={'rgba(255, 255, 255, 0.7'} 
          on
          onChangeText = {
              (emailenter) =>{
              this.setState({emailenter: emailenter});
              let v =validate('email',emailenter);
              this.setState({enterError: !v[0], enterErrorMessage: v[1],disablebutton: v[2]});
             }
            }
          value= {this.state.emailenter}
          placeholder={'  Input Email Address '} 
          underlineColorAndroid='transparent'
          style ={styles.inputEmail}/>
          <Text style={styles.Error} >{this.state.enterErrorMessage}</Text>
          
          
          <Text style={styles.inputPasswordText}>Password</Text>
          <TextInput placeholderTextColor={'rgba(255, 255, 255, 0.7'} 
            value= {this.state.passwordenter}
            onChangeText = {
            (passwordenter) =>{
              this.setState({passwordenter: passwordenter});
              let v =validate('password',passwordenter);
              this.setState({passwordError: !v[0], passwordErrorMessage: v[1], disablebutton: v[2]})
            }}
          placeholder={'  Input password '} 
          secureTextEntry= {true}
          underlineColorAndroid='transparent'
          style ={styles.inputPassword}/>
          <Text style={styles.Error}>{this.state.passwordErrorMessage}</Text>
          <CheckBox style={styles.checkbox} value={this.state.CheckBox} 
          onValueChange={()=> this.RememberMe()}
          ></CheckBox>
          <Text style={styles.Remember}>Remember Email and Password</Text>
      
           <TouchableOpacity style={styles.SignIn} onPress={this.submit} disabled={this.state.disablebutton}>
            <Text style={styles.SignInText}> Sign In </Text>
           </TouchableOpacity>

          </View>
         
</View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FBF8FF',
  
  },
  inputEmail: {
    width: WIDTH - 15,
    borderRadius: 4,
    height: 45,
    fontsize: 16,
    paddingleft: 45,
    backgroundColor: 'rgba(0,0,0,0)',
    color: '#000000',
    marginHorizontal: 25,
    borderColor: '#C4BBDA', 
    borderWidth: 2,
  },
  inputEmailText: {
    fontsize: 40,
    fontWeight: '500',
    marginTop: 80,
    marginLeft:25,
  },
   inputPassword: {
    width: WIDTH - 15,
    borderRadius: 4,
    height: 45,
    fontsize: 16,
    paddingleft: 45,
    backgroundColor: 'rgba(0,0,0,0)',
    color: '#000000',
    marginHorizontal: 25,
    borderColor: '#C4BBDA',
    borderWidth: 2,
  },
  inputPasswordText: {
    fontsize: 40,
    fontWeight: '500',
    marginTop: 20,
    marginLeft:25,
  },
  logo: {
    marginTop: -90,
    height: 150,
    width: 220,
  },
  SignIn: {
    width: WIDTH - 15,
    height: 45,
    borderRadius: 4,
    backgroundColor: '#704DB3',
    justifyContent: 'center',
    marginTop: 30,
    marginHorizontal: 25,
  },
  SignInText:{
    textAlign: 'center',
    fontsize: 20,
    color: '#FFFFFF'
  },
  Error:{
    fontFamily: 'Italic',
    marginLeft: 30,
    fontsize: 20,
    color: 'red',
  },
  checkbox:{
    marginLeft: 20
  },
  Remember:{
    marginLeft: 55,
   marginTop: -25
  }


});
