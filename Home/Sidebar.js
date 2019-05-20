import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as sessionCreators from '../Service/Session/Action';
import {Container, Header, Content,Title, ListItem, Text,Body,Left,Right,Icon,Button} from 'native-base';


 class Sidebar extends React.Component{

    constructor(props){
        super(props);
    }
    
    _logout = () => {
      this.props.sessionAction.clear();
      this.props.navigation.navigate('Login');
    }
   
    render() {
        return (
            
            <Container>
            <Header style={{marginTop:25}}>
            <Left/>
          <Body >
         
            <Title>Header</Title>
           
          </Body>
          </Header>
            <Content>
             
                <ListItem icon  selected={false} onPress={()=>this.props.navigation.navigate('')}>
                <Left>
              <Button style={{ backgroundColor: "brown" }}>
                <Icon style={{fontSize:25}} active name="alpha-r" type="MaterialCommunityIcons" />
              </Button>
            </Left>
                    <Body>
                  <Text>Routes</Text>
                  </Body>
                  <Right>
                <Icon name="arrow-forward" />
              </Right>
                </ListItem>
                <ListItem icon  selected={false} onPress={()=>this.props.navigation.navigate('')}>
                  <Left>
                  <Button style={{ backgroundColor: "#FF9501" }}>
                    <Icon style={{fontSize:25}} active name="alpha-o" type="MaterialCommunityIcons" />
                  </Button>
                  </Left>
                  <Body><Text>Orders</Text></Body>
                  <Right>
                    <Icon name="arrow-forward" />
                  </Right>
                </ListItem>
                
                <ListItem icon button onPress={() => this._logout()}>
                  <Left>
                  <Button style={{ backgroundColor: "green" }}>
                    <Icon style={{fontSize:25}} name="alpha-l" type="MaterialCommunityIcons" />
                  </Button> 
                  </Left>
                  <Body><Text>Logout</Text></Body>
                  <Right>
                    <Icon name="arrow-forward" />
                  </Right>
                </ListItem>
             
            </Content>
          </Container>

        );
    }
}

const mapDispatchToProps = dispatch => ({
  sessionAction : bindActionCreators(sessionCreators, dispatch),
});

export default connect(null, mapDispatchToProps)(Sidebar);