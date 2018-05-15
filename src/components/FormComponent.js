import React from 'react';
import FormBuilder from './FormBuilder';

export default class FormComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { initialValue: 'ddddd' };
    setTimeout(() => {
      this.setState({ initialValue: 'yyyy' });
      console.log('yyyy');
    }, 3000);
  }

  render() {
    const formConfig = {
      columnCount: 2,
      items: [
        {
          field: 'custNo',
          label: 'Customer',
          control: {
            name: 'select',
            config: {
              datasource: this.props.customers,
              allowClear: true,
              onChange: (value, _, form) => {
                form.setFieldsValue({ groupName: value });
                this.props.dispatch({ type: 'example/r_updateCustomer1', payload: value });
              },
            },
          },
          decoratorConfig: { rules: [{ required: true, message: 'Please Select Customer!' }], initialValue: 554402, },
        },
        {
          field: 'groupName',
          label: 'Group Name',
          value: this.state.initialValue,
          control: {
            config: {
              placeholder: 'Group Name',
            },
          },
          formItemLayout: {
            labelCol: { span: 6 },
            wrapperCol: { span: 12 },
          },
          decoratorConfig: { rules: [{ required: true, message: 'Please input group name!' }], initialValue: this.state.initialValue },
        },
        {
          field: 'custGroupName',
          label: 'Customer Group Name',
          control: {
            name: 'select',
            config: {
              datasource: this.props.customer1,
            },
          },
          decoratorConfig: { rules: [{ required: true, message: 'Please select cust group name!' }] },
        },
        {
          field: 'allocType',
          label: 'Alloc Type',
          control: {
            name: 'radioGroup',
            config: {
              datasource: [
                { value: 1, label: 'Customer' },
                { value: 2, label: 'Auto' },
              ],
            },
          },
          decoratorConfig: { rules: [{ required: true, message: 'Please choose Alloc Type!' }], initialValue: 1 },
        },
        {
          field: 'parts',
          label: 'Part',
          control: {
            name: 'textarea',

          },
        },
      ],
      submitHandler: function (values) {
        console.log('submit handler handle', values);
      },
      cancelHandler: function () {
        console.log('cancel form');
      },
    };
    return (
      <FormBuilder {...formConfig} />
    );
  };
}
