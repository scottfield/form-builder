import React from 'react';
import {Button, Col, Form, Input, Row} from 'antd';
import PropTypes from 'prop-types';
import Select from './Select';
import RadioGroup from './RadioGroup';

const FormItem = Form.Item;
const defaultControls = {
  'input': Input,
  'button': Button,
  'textarea': Input,
  'select': Select,
  'radioGroup': RadioGroup,
};
const DEFAULT_CONTROL_NAME = 'input';
const defaultButtonFormItemLayout = {
  wrapperCol: {
    span: 24,
    offset: 16,
  },
};
const TOTAL_COLUMN = 24;
const DEFAULT_COLUMN_COUNT = 1;
const defaultFormItemLayout = {
  labelCol: {span: 6},
  wrapperCol: {span: 12},
};
const defaultSubmitButton = {
  type: 'primary',
  htmlType: 'submit',
  text: 'Ok',
  style: {marginLeft: 10}
};
const defaultCancelButton = {
  type: 'default',
  htmlType: 'button',
  text: 'Cancel',
  onClick: function () {
    console.log("cancel form");
  }
};

class FormBuilder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {}
    };
    console.log("create form builder instance");
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log("form submit", e);
  };
  handleOnChange = (item, e) => {
    console.log("field change", e);
    const controlName = item.control.name || 'input';
    let value = e;
    if (controlName === 'select') {
      value = e;
    }
    if (controlName === 'input' || controlName === 'radioGroup' || controlName === 'TextArea') {
      value = e.target.value;
    }

    this.setState(prevState => {
      return {fields: {...prevState.fields, [item.field]: value}};
    })
  };

  render() {
    console.log("FormBuilder render", this.props);
    const {
      items, formLayout, formItemLayout = defaultFormItemLayout, columnCount = DEFAULT_COLUMN_COUNT,
      extraControls, buttonFormItemLayout = defaultButtonFormItemLayout, submitButton = defaultSubmitButton,
      cancelButton = defaultCancelButton, cancelhandler
    } = this.props;
    const controlMap = {...defaultControls, ...extraControls};

    const cols = items.map((item) => {
      const fieldError = "dafdafdafda";
      const Control = controlMap[item.control.name || DEFAULT_CONTROL_NAME];
      const span = TOTAL_COLUMN / columnCount;
      return (
        <Col key={item.field} span={span}>
          <FormItem
            validateStatus={fieldError ? 'error' : ''}
            help={fieldError || ''}
            label={item.label}
            {...item.formItemLayout || formItemLayout}
          >
            <Control  {...item.control.config} value={this.state.fields[item.field]} onChange={(e) => {
              this.handleOnChange(item, e)
            }}/>
          </FormItem>
        </Col>
      );
    });
    return (
      <Form layout={formLayout} onSubmit={this.handleSubmit}>
        <Row>{cols}</Row>
        <FormItem {...buttonFormItemLayout}>
          <Button
            onClick={cancelhandler}
            {...cancelButton}
          >
            {cancelButton.text}
          </Button>
          <Button
            {...submitButton}
          >
            {submitButton.text}
          </Button>
        </FormItem>
      </Form>
    );
  }
}

FormBuilder.propTypes = {
  formItemLayout: PropTypes.object,
  buttonFormItemLayout: PropTypes.object,
  columnCount: PropTypes.number,
  items: PropTypes.array.isRequired,
  submitButton: PropTypes.object,
  cancelButton: PropTypes.object,
  submitHandler: PropTypes.func.isRequired,
  cancelHandler: PropTypes.func.isRequired,
  extraControls: PropTypes.object
};
export default FormBuilder;
