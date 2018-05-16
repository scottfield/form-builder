import React from "react";
import FormBuilder from "./FormBuilder";

export default class FormComponent extends React.Component {
  render() {
    const formConfig = {
      dispatch: this.props.dispatch,
      action: {type: 'example/r_updateState'},
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
              onChange: (value, _, form) => {
                this.props.dispatch({type: 'example/r_updateCustomer1', payload: value});
                this.props.dispatch({type: 'example/r_updateState', payload: {name: 'custGroupName', value: null}});
              }
            }
          },
          decoratorConfig: {rules: [{required: true, message: 'Please Select Customer!'}],},
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
          decoratorConfig: {rules: [{required: true, message: 'Please input group name!'}]},
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
          decoratorConfig: {rules: [{required: true, message: 'Please choose Alloc Type!'}],},
        },
        {
          field: 'parts',
          label: 'Part',
          value: this.props.parts,
          control: {
            name: 'textarea',
          },
        }
      ],
      submitHandler: function (values) {
        console.log("submit handler handle", values);
      },
      cancelHandler: function () {
        console.log("cancel form");
      },
    };
    return (
      <FormBuilder {...formConfig}/>
    );
  };
}
