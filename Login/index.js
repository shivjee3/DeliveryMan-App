import React from 'react';
import { Text, View, Image,KeyboardAvoidingView,ScrollView } from 'react-native';
import { Container, Content, Item, Input,Button,Icon } from 'native-base';
import Styles from '../Style';
import {authenticate} from '../Service/Api';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as sessionCreators from '../Service/Session/Action';


export  class Login extends React.Component {
  constructor(props){
    super(props);
    this.state={
      userName: "",
      password: "",
      userNameErr: "",
      passwordErr: "",
    };
  }

  onRequestSuccess(response) {
   
    if(response.status=="Failed" || response.status=="Fail" ){
      this.setState({ passwordErr: response.message});
    } else { 
      console.log(JSON.stringify(response));
      this.props.sessionAction.update({"access_token": response.access_token});
      this.props.navigation.navigate("Drawer");
    }
  
  }


  validate = () => {
    if (!this.state.userName) {
      this.setState({userNameErr: "*Please Enter User Name"});
    } else {
      this.setState({userNameErr: null});
    }

    if (!this.state.password) {
      this.setState({passwordErr: "*Please Enter Password"});
    } else {
      this.setState({passwordErr: null});
    }

    if (!this.state.password || !this.state.userName)
      return true;
    else {
      authenticate(this.state.userName,this.state.password)
        .then(this.onRequestSuccess.bind(this))
        .catch((exception) => {
          throw exception;
      });
    }
  
  }
 
  render() {
    return (
      <KeyboardAvoidingView behavior='padding' enabled>
      <ScrollView>
     <Container>
     <Content style={{margin:30}}> 
     
      <View style={{flex:1,flexDirection:'column',alignItems:'center'}} >    
          <View style={{marginVertical:50}}>
            <Image
            style={{width:110,height:60}}
            source={require('../assets/DigitalIndia.jpg')}
            />
          </View>

          <View style={{flex:1,flexDirection:'column', alignItems:'center',justifyContent:'center'}}>
         
            <Item>
              <Icon style={Styles.iconColor} type="MaterialCommunityIcons" name='account-outline' />
              <Input 
                placeholder="Username"
                onChangeText={name => this.setState({userName:name})}
                value={this.state.userName}
              />
            </Item>
            <Text style={{color:'red'}}>{this.state.userNameErr}</Text>
            
            <Item>
              <Icon style={Styles.iconColor} type="MaterialCommunityIcons" name='lock-outline' /> 
              <Input 
                placeholder="Password" 
                secureTextEntry={true}
                onChangeText={pass => this.setState({password:pass})}
                value={this.state.password}
              />
            </Item>     
            <Text style={{color:'red'}}>{this.state.passwordErr}</Text>

            <Button block style={Styles.lgnbtn} onPress={()=>this.validate()}>
              <Text>Login</Text>
            </Button>

          </View>
      </View> 
        
      </Content> 
      </Container> 
      </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  sessionAction : bindActionCreators(sessionCreators, dispatch),
});

export default connect(null, mapDispatchToProps)(Login);