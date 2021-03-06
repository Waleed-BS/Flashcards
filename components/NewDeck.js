import React, { Component } from 'react';
import { connect } from "react-redux";
import { KeyboardAvoidingView, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { NavigationActions } from 'react-navigation';

import { addDeck } from "../actions/Decks_Action"
import { mergeDeck } from "../utils/api"

class NewDeck extends Component {

  state = {
    deckName: ''
  }

  onDeckNameChange = (input) => {
    this.setState({
      deckName: input
    })
  }

  submitDeck = () => {
    const { deckName } = this.state;
    const { addDeckDispatch } = this.props
    mergeDeck([], deckName)
    addDeckDispatch(deckName)

    const { navigation } = this.props

    this.redirectToDeck(deckName)
  }

  redirectToDeck = (deckName) => {
    const { navigation } = this.props
    navigation.dispatch(NavigationActions.navigate({
      routeName: 'Deck',
      params: {deckName}
    }))
    this.setState({deckName: ""})
    // navigation.navigate("Home")
  }

  render() {

    const { deckName } = this.state
    return (

      <KeyboardAvoidingView >

        <Text style={style.text}>
          Deck Title
        </Text>

        <TextInput
          placeholder="Enter Deck Title"
          style={style.inputField}
          value={deckName}
          onChangeText={this.onDeckNameChange}/>

        <TouchableOpacity
          style={style.buttonsBox}
          onPress={this.submitDeck}
          ><Text style={style.buttonsText}>Submit Deck</Text>
        </TouchableOpacity>

      </KeyboardAvoidingView>

    )

  }


}

const style = StyleSheet.create({
  text: {
    fontSize: 35,

    textAlign: "center",
    // color: "black",
    marginTop: 120,
    // paddingBottom: 15,

    // height:50,
    // margin: 20,
    // padding: 10,
    // paddingTop: ,
    // paddingBottom:
  },
  inputField: {
    height: 50,
    textAlign: 'center',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    marginTop: 20,
    borderStyle: "solid",
    borderRadius: 20,
    borderColor: 'black',
    borderWidth: 2,
    // justifyContent: "center",
    paddingLeft: 15,
    paddingRight: 15,
    // borderColor: "#FFFFFF",
  },
  buttonsText: {
    fontSize: 20,

    textAlign: "center",
    color: "white",
    height:50,
    margin: 20,
    padding: 10,
    // paddingTop: ,
    // paddingBottom:
  },
  buttonsBox: {
    // color: 'white',
    backgroundColor: "black",
    // small = true when at Quiz
    // margin: 20,
    // padding: 10,
    height: 50,
    minWidth: 100,
    borderRadius: 50,
    // borderWidth: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

function mapStateToProps(decks) {
  return {
    decks
  }
}

function mapDispatchToProps (dispatch) {
  return {
    addDeckDispatch: (deckName) => {dispatch(addDeck(deckName))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewDeck)
