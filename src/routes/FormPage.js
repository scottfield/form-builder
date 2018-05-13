import React from 'react';
import {connect} from 'dva';
import Form from '../components/FormComponent';

function FormPage(props) {
  return (
    <Form {...props}/>
  );
}

function mapStateToProps(props) {
  return {...props.example};
}

export default connect(mapStateToProps)(FormPage);
