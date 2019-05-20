import React, { Component } from 'react';
import { Text as TextRN } from 'native-base';
import Styles from './Style'

export default class Text extends Component {
  render() {
    return (
      <TextRN {...this.props} style={[Styles.text, this.props.style]}>
        {this.props.children}
      </TextRN>
    )
  }
}