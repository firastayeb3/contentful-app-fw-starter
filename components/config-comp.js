import React, { Component } from "react";
import { render } from "react-dom";

import { init, locations } from "contentful-ui-extensions-sdk";
import "@contentful/forma-36-react-components/dist/styles.css";
import "@contentful/forma-36-fcss/dist/styles.css";
import {
  Note,
  TextField,
  Form
} from "@contentful/forma-36-react-components";

class Config extends Component {
  constructor(props) {
    super(props);
    this.state = { parameters: {
        // the app configuration parameters here !
    } };
    this.sdk = this.props.sdk;
    this.app = this.props.sdk.app;
    this.app.onConfigure(() => this.onConfigure());
  }

  async componentDidMount() {
    const parameters = await this.app.getParameters();
    this.setState({ parameters: parameters || {} }, () => this.app.setReady());
  }

  render() {
    return (<div>
      <Note noteType="primary" title="About the app">
            Configuration form here.
        </Note>
      <Form id='formID'>
        <TextField name='TextFieldName' value={this.state.parameters.exampleEnvVar?this.state.parameters.exampleEnvVar:''}
        id='id'
        labelText='labelText'
        onChange={e=> {
            this.state.parameters.exampleEnvVar = e.target.value;
        }} />
      </Form></div>
    );
  }

  async onConfigure() {
    return {
      parameters: this.state.parameters,
    };
  }
}

export default Config;