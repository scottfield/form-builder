import React from "react";
import FormBuilder from "./FormBuilder";


const Form = FormBuilder.config({
  onValuesChange: (props, changedValues, allValues) => {
    console.log("onValuesChange", props, changedValues, allValues);
  },
  onFieldsChange: (props, fields) => {
    console.log("onFieldsChange", props, fields);
  }
}).build();
export default class FormComponent extends React.Component {
  render() {
    const formConfig = {
      formItemLayout: {
        labelCol: {span: 6},
        wrapperCol: {span: 12},
      },
      columnCount: 2,
      items: [
        {
          field: 'custNo',
          label: 'Customer',
          control: {
            name: 'select',
            config: {
              dataSource: [{value: 554401, label: 'WOODY'}, {value: 554402, label: 'BUZZ'}],
              allowClear: true
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
            config: {
              placeholder: 'Group Name'
            }
          },
        },
        {
          field: 'allocType',
          label: 'Alloc Type',
          control: {
            name: 'radioGroup',
            config: {
              dataSource: [
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
      <Form formConfig={formConfig}/>
    );
  };
}
