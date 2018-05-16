import React from 'react';
import {connect} from 'dva';
import Form from '../components/FormComponent';

class FormPage extends React.Component {
  render() {
    return (<Form {...this.props}/>);
  }
}

function mapStateToProps(props) {
  return {...props.example};
}

export default connect(mapStateToProps)(FormPage);
