import React from 'react';
import {Form, Input, Button, Row, Col} from 'antd';
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

class FormBuilder extends React.Component {
  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        (this.props.formConfig.submitHandler || console.log)(values);
      }
    });
  }

  render() {
    const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;
    const {items, formLayout, formItemLayout, columnCount = 1, submitButton, extraControls, cancelButton} = this.props.formConfig;
    const controlMap = {...defaultControls, ...extraControls};
    const buttonFormItemLayout = {
      wrapperCol: {
        span: 24,
        offset: 16,
      },
    };
    const cols = items.map((item) => {
      const fieldError = isFieldTouched(item.field) && getFieldError(item.field);
      const Controls = controlMap[item.control.name || 'input'];
      const span = 24 / columnCount;
      return (
        <Col key={item.field} span={span}>
          <FormItem
            validateStatus={fieldError ? 'error' : ''}
            help={fieldError || ''}
            label={item.label}
            {...item.formItemLayout || formItemLayout}
          >
            {getFieldDecorator(item.field, item.decoratorConfig)(
              <Controls  {...item.control.config}/>
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
            {...cancelButton}
          >
            {cancelButton.text}
          </Button>
          <Button
            {...submitButton}
            disabled={hasErrors(getFieldsError())}
          >
            {submitButton.text}
          </Button>
        </FormItem>
      </Form>
    );
  }
}

export default {
  config: function (options) {
    this.options = options;
    return this;
  },
  build: function () {
    return Form.create(this.options || {})(FormBuilder);
  }
};
