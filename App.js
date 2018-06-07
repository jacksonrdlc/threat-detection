import React from 'react';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import axios from 'axios'

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      hits: [],
    };
  }

  componentDidMount() {
    setInterval(() => {
      this.getFrames()
    }, 3000)
  }

  getFrames() {
    const axiosInstance = axios.create({
      baseURL: "https://ere8in5vtf.execute-api.us-east-1.amazonaws.com/development",
      headers: { 'X-api-key': "xBCYm2iB5W6GfgUKycClz8gcYBVzhizs6g8uRVn8", 'Content-Type': 'application/json' }
    });
    return axiosInstance.get('enrichedframe')
      .then((responseJson) => {
        let hits = responseJson.data
        console.log(responseJson)
        this.setState({ hits });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  renderFrames(frame) {
    if (frame.item.warning_response.name) {
      return (
        <View
          style={{ margin: 10, backgroundColor: '#BF5144', borderRadius: 4, shadowColor: '#000', shadowOpacity: .15, shadowOffset: {width: 1, height: 3} }}>
          <Image
            style={{ width: 350, height: 200, margin: 20 }}
            source={require('./images/Rudelic_Jack.jpeg')}
          />
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 10, backgroundColor: '#AF493D', color: '#fff' }}>
            <Text style={{ fontSize: 22, color: '#fff' }}>Threat Detected</Text>
            <Text style={{ fontSize: 16, color: '#fff' }}>Jack Rudelic</Text>
            <Text style={{ fontSize: 16, color: '#fff' }}>{ new Date().toLocaleString()}</Text>
          </View>
        </View>
      );
    } else if (frame.item.image_response.name) {
      return (
        <View
          style={{ margin: 10, backgroundColor: '#8CBEA3', borderRadius: 4, shadowColor: '#000', shadowOpacity: .15, shadowOffset: {width: 1, height: 3} }}>
          <Image
            style={{ width: 350, height: 200, margin: 20 }}
            source={require('./images/DawnKing.jpg')}
          />
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 10, backgroundColor: '#75B693', color: '#fff' }}>
            <Text style={{ fontSize: 22, color: '#fff' }}>Friend Detected</Text>
            <Text style={{ fontSize: 16, color: '#fff' }}>Dawn King</Text>
            <Text style={{ fontSize: 16, color: '#fff' }}>{ new Date().toLocaleString()}</Text>
          </View>
        </View>
      );
    } else {
      return (
        <View
          style={{ margin: 10, backgroundColor: '#ccc', borderRadius: 4, shadowColor: '#000', shadowOpacity: .15, shadowOffset: {width: 1, height: 3} }}>
          <Image
            style={{ width: 350, height: 200, margin: 20 }}
            source={require('./images/Unknown_Person.png')}
          />
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 10, backgroundColor: '#aaa', color: '#fff' }}>
            <Text style={{ fontSize: 22, color: '#fff' }}>Unknown Persons</Text>
            <Text style={{ fontSize: 16, color: '#fff' }}>Face May Be Covered</Text>
            <Text style={{ fontSize: 16, color: '#fff' }}>{ new Date().toLocaleString()}</Text>
          </View>
        </View>
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.hits}
          renderItem={this.renderFrames}
          keyExtractor={item => item.frame_id}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEEEEE',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  frameGood: {
    flex: 1,
    color: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#76B594',
    padding: 10
  },
  frameBad: {
    flex: 1,
    color: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#AF493D',
    padding: 10
  },
});
