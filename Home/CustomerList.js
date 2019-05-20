import React from 'react';

import {Container, Header, Spinner, Content,View, List,Title, ListItem,Input,Item, Text,Body,Left,Right,Icon,Button} from 'native-base';
import * as Api from '../Service/Api';

export default class Customer extends React.Component{

    constructor(props){
        super(props);
        this.state = {
          isLoading: true,
          retailers: [],
          searchTxt: '',
          
        };
        this.retailerArray = [];
      }
    

    onRequestSuccess(response) {
      console.log(JSON.stringify(response));
      this.setState({isLoading: false,retailers: response.retailers});
      alert(this.state.retailers);
      this.retailerArray = response.retailers;
    }

   

    componentDidMount (){
      Api.getRetailers()
        .then(this.onRequestSuccess.bind(this))
        .catch((exception) => {
          throw exception;
      });
    }

    _searchFilterFunction = text => {    
      const newData = this.retailerArray.filter(item => {      
         const textData = text.toUpperCase();  
         return item.companyName.toUpperCase().indexOf(textData) > -1;    
      });    
      this.setState({retailers: newData,searchTxt: text});  
    };
   
    render() {
      
        return (
             
            <Container>
    
            <Header style={{marginTop:25, backgroundColor:'#FFCA28', height:48}}>
            <Left style={{flex:0.3}}>
            <Button transparent onPress={() => this.props.navigation.openDrawer()}>
              <Icon name='menu'  />
            </Button>
          </Left>
          <Body style={{}}>
            <Title style={{color:"brown"}}>Customers</Title>
           
          </Body>
          </Header>
          <Item  rounded bordered style={{height:45,marginTop:5, backgroundColor:'#fff'}}>
            <Icon name="md-search" />
            <Input
            onChangeText={query => this._searchFilterFunction(query)}
            value={this.state.searchTxt}  
             placeholder="Search by name.." />
            
            <Button transparent>
            <Icon name="people" /> 
          </Button>
          </Item>
         
            <Content>
            {
            (this.state.retailers.length<1)? 
          (<View><Text style={{marginLeft:25,color:'grey'}} >No record found!</Text><Spinner/></View>):
              (<List 
                dataArray={this.state.retailers}
                renderRow={data=>
                <ListItem
                 onPress={()=>this.props.navigation.navigate('CustomerDetails',{customerId:data.id} )}>
              
                <Left style={{flex:0.2}}>
                  <Text style={{width:35,height:35,paddingLeft:3,color:'#fff',textAlign:'center',fontWeight:'bold',textAlignVertical:'center',backgroundColor:'orange',borderRadius:10}}>{data.companyName.charAt(0).toUpperCase()} </Text>
                </Left>
                <Body>
                  <Text>{data.companyName}</Text>
                  <Text note numberOfLines={1}>{data.address}</Text>
                </Body>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
                </ListItem>
                }
              />)}
              
            </Content>

          </Container>

        );
    }
}