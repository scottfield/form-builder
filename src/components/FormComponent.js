import React from "react";
import FormBuilder from "./FormBuilder";

export default class FormComponent extends React.Component {
  render() {
    console.log("FormComponent render");
    const formConfig = {
      items: [
        {
          field: 'custNo',
          label: 'Customer',
          value: this.props.custNo,
          control: {
            name: 'select',
            config: {
              datasource: this.props.customers,
              allowClear: true,
            }
          },
        },
        {
          field: 'groupName',
          label: 'Group Name',
          value: this.props.groupName,
          control: {
            config: {
              placeholder: 'Group Name'
            }
          },
          formItemLayout: {
            labelCol: {span: 6},
            wrapperCol: {span: 12},
          },
        },
        {
          field: 'custGroupName',
          label: 'Customer Group Name',
          value: this.props.custGroupName,
          control: {
            name: 'select',
            config: {
              datasource: this.props.customer1
            }
          },
        },
        {
          field: 'allocType',
          label: 'Alloc Type',
          value: this.props.allocType,
          control: {
            name: 'radioGroup',
            config: {
              datasource: [
                {value: 1, label: 'Customer'},
                {value: 2, label: 'Auto'},
              ]
            }
          },
        },
        {
          field: 'parts',
          label: 'Part',
          value: this.props.parts,
          control: {
            name: 'input',
          },
        }
      ],
      submitHandler: function (values) {
        console.log("submit handler handle", values);
      },
      cancelHandler: function () {
        console.log("cancel form");
      },
      wrappedComponentRef: function (wrappedComponent) {
        console.log(wrappedComponent);
      }
    };
    return (
      <FormBuilder {...formConfig}/>
    );
  };
}
