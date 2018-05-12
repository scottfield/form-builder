import React from 'react';
import {Select as AntdSelect} from 'antd';

export default class Select extends React.Component {
  render() {
    const {dataSource, ...passThroughConfig} = this.props;
    return (
      <AntdSelect {...passThroughConfig}>
        {
          dataSource.map(item =>
            <AntdSelect.Option key={item.value} value={item.value}>{item.label}</AntdSelect.Option>)
        }
      </AntdSelect>);
  }
}
