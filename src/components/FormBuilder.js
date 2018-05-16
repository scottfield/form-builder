import React from 'react';
import {Button, Col, Form, Input, Row} from 'antd';
import PropTypes from 'prop-types';
import Select from './Select';
import RadioGroup from './RadioGroup';

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

const FormItem = Form.Item;
const defaultControls = {
  'input': Input,
  'button': Button,
  'textarea': Input.TextArea,
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
      submited: false,
    };
  }

  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        (this.props.submitHandler || console.log)(values);
      } else if (!this.state.submited) {
        this.setState({submited: true});
      }
    });
  }

  render() {
    console.log("FormBuilder render");
    const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;
    const {
      items, formLayout, formItemLayout = defaultFormItemLayout, columnCount = DEFAULT_COLUMN_COUNT,
      extraControls, buttonFormItemLayout = defaultButtonFormItemLayout, submitButton = defaultSubmitButton,
      cancelButton = defaultCancelButton, cancelhandler
    } = this.props;
    const controlMap = {...defaultControls, ...extraControls};

    const cols = items.map((item) => {
      const fieldError = ( isFieldTouched(item.field) || this.state.submited) && getFieldError(item.field);
      const Control = controlMap[item.control.name || DEFAULT_CONTROL_NAME];
      const span = TOTAL_COLUMN / columnCount;
      const onChange = (...params) => {
        (item.control.config && item.control.config.onChange || noop)(...params, this.props.form);
      };
      return (
        <Col key={item.field} span={span}>
          <FormItem
            validateStatus={fieldError ? 'error' : ''}
            help={fieldError || ''}
            label={item.label}
            {...item.formItemLayout || formItemLayout}
          >
            {getFieldDecorator(item.field, item.decoratorConfig)(
              <Control  {...item.control.config} onChange={onChange}/>
            )}
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
const noop = () => {
};
export default Form.create({
  onValuesChange: (props, changedValues, allValues) => {
    console.log("onValuesChange");
    (props.onValuesChange || noop)(props, changedValues, allValues);
  },
  onFieldsChange: (props, fields) => {
    if (Object.values(fields).includes(field => field.dirty)) {
      return;
    }
    if (props.onFieldsChange) {
      props.onFieldsChange(props, fields);
    } else if (props.dispatch) {
      Object.keys(fields).forEach(field => {
        props.dispatch({...props.action, payload: {...props.action.payload, name: field, value: fields[field].value}});
      });
    }

    (props.onFieldsChange || noop)(props, fields);
  },
  mapPropsToFields: (props) => {
    console.log("mapPropsToFields");
    return props.items.filter(item => Object.keys(item).includes("value")).reduce((accumulator, item) => {
      accumulator[item.field] = Form.createFormField({value: item.value});
      return accumulator;
    }, {});
  }
})(FormBuilder);
