import React from "react";
import FormBuilder from "./FormBuilder";

export default class FormComponent extends React.Component {
  render() {
    const formConfig = {
      items: [{
        field: 'custNo',
        label: 'Customer',
        control: {
          config: {
            type: 'text',
          }
        },
        rules: [{required: true, message: 'Please Select Customer!'}]
      }, {
        field: 'groupName',
        label: 'Group Name',
        control: {
          config: {
            type: 'password',
            placeholder: 'Group Name'
          }
        },
        rules: [{required: true, message: 'Please input group name!'}]
      },
        {
          field: 'custGroupName',
          label: 'Customer Group Name',
          control: {
            config: {
              type: 'password',
              placeholder: 'Group Name'
            }
          }
        }],
      submitButton: {
        type: 'primary',
        htmlType: 'submit',
        text: 'Save'
      },
      submitHandler: function (values) {
        console.log("submit handler handle", values);
      }
    };
    return (
      <FormBuilder formConfig={formConfig}/>
    );
  };
}
