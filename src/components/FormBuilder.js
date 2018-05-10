import React from 'react';
import {Form, Input, Button} from 'antd';

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

const FormItem = Form.Item;
const defaultControlMap = {
  'input': function () {
    return Input;
  },
  'button': function () {
    return Button;
  }
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
    const items = this.props.formConfig.items;
    const button = this.props.formConfig.submitButton;
    const ControlMap = {...defaultControlMap, ...this.props.formConfig.controls};
    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        {
          items.map((item) => {
            const fieldError = isFieldTouched(item.field) && getFieldError(item.field);
            const Control = ControlMap[item.control.name || 'input']();
            return (
              <FormItem
                key={item.field}
                validateStatus={fieldError ? 'error' : ''}
                help={fieldError || ''}
                label={item.label}
              >
                {getFieldDecorator(item.field, {rules: item.rules})(
                  <Control  {...item.control.config}/>
                )}
              </FormItem>
            );
          })
        }
        <FormItem>
          <Button
            {...button}
            disabled={hasErrors(getFieldsError())}
          >
            {button.text}
          </Button>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(FormBuilder);
