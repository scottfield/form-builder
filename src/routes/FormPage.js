import React from 'react';
import {connect} from 'dva';
import Form from '../components/FormComponent';

function FormPage() {
  return (
    <Form/>
  );
}


export default connect()(FormPage);
