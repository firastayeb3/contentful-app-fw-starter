import React, { Component } from "react";
import { render } from "react-dom";
import Config from './components/config-comp'

import { init, locations } from "contentful-ui-extensions-sdk";
import "@contentful/forma-36-react-components/dist/styles.css";
import "@contentful/forma-36-fcss/dist/styles.css";
import {
  Heading,
  Note,
  Form,
  SelectField,
  Option
} from "@contentful/forma-36-react-components";

init(sdk => {
  const root = document.getElementById("root");

  if (sdk.location.is(locations.LOCATION_APP_CONFIG)) {
    render(<Config sdk={sdk} />, root);
  } else if (sdk.location.is(locations.LOCATION_ENTRY_SIDEBAR)) {
    render(<Sidebar sdk={sdk} />, root);
    sdk.window.startAutoResizer();
  }
});

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.app = this.props.sdk.app;
    this.appConfigParameters = this.props.sdk.parameters.installation.exampleEnvVar?this.props.sdk.parameters.installation.exampleEnvVar:'';
  }

  async componentDidMount() {
  }

  render() {
    const SidbarStyle = {
      width: 'inherit'
    }
    return (
      <Note style={SidbarStyle} noteType="primary" title="About the app">
          This will be desplayed only in the sidebar of an entry.
          You chave access also to the config parameters:
          {this.appConfigParameters}
      </Note>
    );
  }

  async onConfigure() {
    const {
      items: contentTypes
    } = await this.props.sdk.space.getContentTypes();
    const contentTypeIds = contentTypes.map(ct => ct.sys.id);

    return {
      parameters: this.state.parameters,
      targetState: {
        EditorInterface: contentTypeIds.reduce((acc, id) => {
          return { ...acc, [id]: { sidebar: { position: 0 } } };
        }, {})
      }
    };
  }
}

function AnimalPicture({ sdk }) {
  const animal = sdk.parameters.installation.animal || DEFAULT_ANIMAL;
  const src = `https://source.unsplash.com/250x250/?${animal}`;

  return <img alt={animal} id="animal-picture" src={src} />
}
