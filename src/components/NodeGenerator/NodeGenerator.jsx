import React, { Component } from "react";
import * as PropTypes from "prop-types";
import { isFunction } from "../utils/Validator";
import Grid from "@material-ui/core/Grid";
import FieldInput from "../CustomInput/FieldInput";
import CustomDateInput from "../CustomDateInput/CustomDateInput";

export default class NodesGenerator extends Component {
  constructor(props) {
    super(props);
    this.state = { ...this.constructState() };
  }

  constructState = () => {
    let temp = {};
    this.props.elements.map(element => {
      element.type === "boolean"
        ? (temp[element.key] = false)
        : (temp[element.key] = "");
    });
    return temp;
  };

  componentDidMount() {
    this.initiateState();
  }

  initiateState = () => {
    let temp = {};
    this.props.elements.map(element => {
      temp[element.key] = this.preparingInitValue(element);
    });

    this.setState({
      ...temp
    });
  };

  preparingInitValue = element => {
    if (element.type === "boolean")
      return !!(
        this.props.externalInitializationData &&
        this.props.externalInitializationData[element.key] === "true"
      );
    else
      return this.props.externalInitializationData &&
        (this.props.externalInitializationData[element.key] ||
          this.props.externalInitializationData[element.key] === 0)
        ? this.props.externalInitializationData[element.key]
        : element.value
        ? element.value
        : "";
  };

  elementOnChange = (event, element) => {
    const {
      target: { value }
    } = event;
    this.onChange(value, element);
  };

  onChange = (value, element) => {
    this.setState({ [element.key]: this.prepareValue(value, element.type) });
    if (isFunction(element.onChange)) element.onChange();
  };

  prepareValue = (value, type) => {
    switch (type) {
      case "long":
      case "number":
        return parseInt(value);
      default:
        return value;
    }
  };

  getState = () => {
    return this.state;
  };

  createNodes = elements => {
    return elements.map(element => {
      switch (element.type) {
        case "textarea":
        case "string":
        case "text":
          return (
            <Grid item xs={12} sm={12} md={4} key={element.key}>
              <FieldInput
                name={element.key}
                value={this.state[element.key]}
                onChange={event => this.elementOnChange(event, element)}
                notRequired={element.notRequired}
                type={element.inputType}
              />
            </Grid>
          );
        case "date":
          return (
            <Grid item xs={12} sm={12} md={4} key={element.key}>
              <CustomDateInput
                name={element.key}
                initial={
                  this.props.externalInitializationData
                    ? this.props.externalInitializationData[element.key]
                    : ""
                }
                onChange={value => this.onChange(value, element)}
              />
            </Grid>
          );
        default:
          return <div key={element.key} />;
      }
    });
  };

  render() {
    return <>{this.createNodes(this.props.elements)}</>;
  }
}

NodesGenerator.propTypes = {
  elements: PropTypes.arrayOf(PropTypes.object).isRequired,
  externalInitializationData: PropTypes.any
};
