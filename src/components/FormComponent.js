import React from "react";
import FormBuilder from "./FormBuilder";

export default class FormComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {...props};
  }

  render() {
    const formConfig = {
      formItemLayout: {
        labelCol: {span: 6},
        wrapperCol: {span: 12},
      },
      onFieldsChange: (props, fields) => {
        console.log("field changes in form configuration", props, fields);
        /*if (fields.custNo) {
          this.setState({customer1: this.props.customer1.filter(item => item.value === fields.custNo.value)});
        }*/
      },
      columnCount: 1,
      items: [
        {
          field: 'custNo',
          label: 'Customer',
          control: {
            name: 'select',
            config: {
              datasource: this.state.customers,
              allowClear: true,
              onChange: function (value, _, form) {
                debugger
                form.setFieldsValue({custGroupName: value});
              }
            }
          },
          decoratorConfig: {rules: [{required: true, message: 'Please Select Customer!'}], initialValue: 554401,},
        }, {
          field: 'groupName',
          label: 'Group Name',
          control: {
            config: {
              placeholder: 'Group Name'
            }
          },
          formItemLayout: {
            labelCol: {span: 6},
            wrapperCol: {span: 12},
          },
          decoratorConfig: {rules: [{required: true, message: 'Please input group name!'}]},
        },
        {
          field: 'custGroupName',
          label: 'Customer Group Name',
          control: {
            name: 'select',
            config: {
              datasource: this.state.customer1
            }
          },
        },
        {
          field: 'allocType',
          label: 'Alloc Type',
          control: {
            name: 'radioGroup',
            config: {
              datasource: [
                {value: 1, label: 'Customer'},
                {value: 2, label: 'Auto'},
              ]
            }
          },
          decoratorConfig: {rules: [{required: true, message: 'Please choose Alloc Type!'}], initialValue: 1},
        },
        {
          field: 'parts',
          label: 'Part',
          control: {
            name: 'textarea',
          },
        }
      ],
      submitButton: {
        type: 'primary',
        htmlType: 'submit',
        text: 'Save',
        style: {marginLeft: 10}
      },
      submitHandler: function (values) {
        console.log("submit handler handle", values);
      },
      cancelButton: {
        type: 'default',
        htmlType: 'button',
        text: 'Cancel',
        onClick: function () {
          console.log("cancel form");
        }
      },
    };
    return (
      <FormBuilder formConfig={formConfig}/>
    );
  };
}
