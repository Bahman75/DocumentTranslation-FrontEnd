import React, { Component, Fragment } from "react";
import * as PropTypes from "prop-types";
import SnackbarWrapper from "../Snackbar/SnackbarWrapper";
import { getTypeByKey } from "./OrderTypes";
import * as URLConstant from "../../URLConstant";
import Api from "../Api/Api";
import CreateReport from "../Report/CreateReport";
import { OrderStatus } from "./OrderStatus";
import OrderForm from "./OrderForm";

class EditViewOrder extends Component {
  constructor(props) {
    super(props);
    this.orderFormRef = React.createRef();
    this.api = new Api();
    this.state = {
      isLoading: false,
      initialState: null,
      type: null
    };
  }

  componentDidMount() {
    this.getOrder();
  }

  getOrder = async () => {
    let self = this;
    let postData = {
      id: this.props.itemId
    };
    await this.api
      .doPostNoAppend(
        process.env.REACT_APP_HOST_URL +
          process.env.REACT_APP_MAIN_PATH +
          URLConstant.GET_ORDER_BY_ID,
        postData
      )
      .then(function(res) {
        if (!res.success) self.props.showSnackbar(res.message, "error");
        else {
          self.setState({
            initialState: res.data.details,
            type: getTypeByKey(res.data.type),
            isLoading: false
          });
        }
      });
  };

  handleSubmit = () => {
    this.setState(
      {
        isLoading: true
      },
      () => {
        this.updateOrder(true, OrderStatus.PENDING.name);
      }
    );
  };

  updateOrder = (close, status) => {
    let self = this;
    let orderFormState = this.orderFormRef.current.getState();
    let files = orderFormState
      ? orderFormState.files
        ? orderFormState.files
        : []
      : [];
    delete orderFormState["files"];
    let postData = {
      id: this.props.itemId,
      type: this.state.type ? this.state.type.code : "",
      status: status,
      details: orderFormState
    };
    this.api
      .doPostNoAppend(
        process.env.REACT_APP_HOST_URL +
          process.env.REACT_APP_MAIN_PATH +
          URLConstant.CREATE_ORDER,
        postData
      )
      .then(function(res) {
        self.props.showSnackbar(res.message, res.success ? "success" : "error");
        self.handleFileSelect(files).then(
          () => {
            self.orderFormRef.current.onRefresh();
          },
          () => {
            self.setState({
              isLoading: false
            });
          }
        );
      });
  };

  handleSave = () => {
    this.setState(
      {
        isLoading: true
      },
      () => {
        this.updateOrder(false, OrderStatus.COMPLETING.name);
      }
    );
  };

  handleFileSelect = async files => {
    let self = this;
    for (let file of files) {
      let params = {
        type: "documents",
        name: file.name,
        orderId: self.props.itemId,
        size: file.size
      };
      await this.api
        .doPostMultiPartFileAndHeader(
          process.env.REACT_APP_HOST_URL +
            process.env.REACT_APP_MAIN_PATH +
            URLConstant.CREATE_DOCUMENT,
          file,
          params
        )
        .then(function(res) {
          if (!res.success) self.props.showSnackbar(res.message, "error");
        });
    }
  };

  render() {
    return (
      <Fragment>
        {this.props.type === "ADMIN" && (
          <CreateReport
            data={this.state.initialState}
            id={this.props.itemId}
            type={this.state.type}
          />
        )}
        {this.state.initialState && this.state.type && (
          <OrderForm
            ref={this.orderFormRef}
            onSubmit={this.handleSubmit}
            onSave={this.handleSave}
            isLoading={this.state.isLoading}
            initialState={this.state.initialState}
            form={this.state.type.form}
            itemId={this.props.itemId}
            onFileSelect={this.handleFileSelect}
          />
        )}
      </Fragment>
    );
  }
}

EditViewOrder.propTypes = {
  itemId: PropTypes.number.isRequired,
  type: PropTypes.string
};

export default SnackbarWrapper(EditViewOrder);
