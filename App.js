import React from 'react'
import { StyleSheet, Text, View, Image, FlatList } from 'react-native'
import axios from 'axios'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hits: []
    }
  }

  componentDidMount() {
    setInterval(() => {
      this.getFrames()
    }, 3000)
  }

  getFrames() {
    const axiosInstance = axios.create({
      baseURL:
        'https://ere8in5vtf.execute-api.us-east-1.amazonaws.com/development',
      headers: {
        'X-api-key': 'xBCYm2iB5W6GfgUKycClz8gcYBVzhizs6g8uRVn8',
        'Content-Type': 'application/json'
      }
    })
    return axiosInstance
      .get('enrichedframe')
      .then(responseJson => {
        let hits = responseJson.data
        console.log(responseJson)
        this.setState({ hits })
      })
      .catch(error => {
        console.error(error)
      })
  }

  renderFrames(frame) {
    if (frame.item.warning_response.name || frame.item.image_response.name) {
      return (
        <View
          style={{
            margin: 10,
            backgroundColor: '#CCC',
            borderRadius: 4,
            shadowColor: '#000',
            shadowOpacity: 0.15,
            shadowOffset: { width: 1, height: 3 }
          }}
        >
          <Image
            style={{ width: 350, height: 200, margin: 20 }}
            source={require('./images/Unknown_Person.png')}
          />
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              padding: 10,
              backgroundColor: '#AAA',
              color: '#fff'
            }}
          >
            <Text style={{ fontSize: 22, color: '#fff' }}>Known Person</Text>
            <Text style={{ fontSize: 16, color: '#fff' }}>{frame.item.warning_response.name}</Text>
            <Text style={{ fontSize: 16, color: '#fff' }}>
              {new Date().toLocaleString()}
            </Text>
          </View>
        </View>
      )
    } else {
      return (
        <View
          style={{
            margin: 10,
            backgroundColor: '#CCC',
            borderRadius: 4,
            shadowColor: '#000',
            shadowOpacity: 0.15,
            shadowOffset: { width: 1, height: 3 }
          }}
        >
          <Image
            style={{ width: 350, height: 200, margin: 20 }}
            source={require('./images/Unknown_Person.png')}
          />
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              padding: 10,
              backgroundColor: '#AAA',
              color: '#fff'
            }}
          >
            <Text style={{ fontSize: 22, color: '#fff' }}>Unknown Person</Text>
            <Text style={{ fontSize: 16, color: '#fff' }}>
              {new Date().toLocaleString()}
            </Text>
          </View>
        </View>
      )
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
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEEEEE',
    alignItems: 'stretch',
    justifyContent: 'center'
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
  }
})
