import React from 'react';
import {Select as AntdSelect} from 'antd';

export default class Select extends React.Component {
  render() {
    const {datasource, ...passThroughConfig} = this.props;
    return (
      <AntdSelect {...passThroughConfig}>
        {
          datasource.map(item =>
            <AntdSelect.Option key={item.value} value={item.value}>{item.label}</AntdSelect.Option>)
        }
      </AntdSelect>);
  }
}
