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
      baseURL: "https://zk5vbj5avk.execute-api.us-east-1.amazonaws.com/development",
      headers: { 'X-api-key': "J9gDvQBdt25qXvCWk5Oou7HB1IdnJaqk5YYKdvfA" }
    });
    return axiosInstance.get('enrichedframe')
      .then((responseJson) => {
        let hits = responseJson.data
        console.log(hits)
        this.setState({ hits });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  renderFrames(frame) {
    return (
      <View>
        <Image
          style={{width: '100%', height: 200}}
          source={{uri: frame.item.s3_presigned_url}}
        />
        <FlatList
          style={styles.frame}
          data={frame.item.rekog_labels}
          renderItem={(label) => {
            return (
              <View>
                <Text>{label.item.Name}</Text>
                <Text>{label.item.Confidence}</Text>
              </View>);
          }}
          keyExtractor={frame => frame.index}
        />
      </View>
    );
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
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  frame: {
    flex: 1,
    backgroundColor: '#eee',
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
});
