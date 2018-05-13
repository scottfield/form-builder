import React from 'react';
import {Radio} from 'antd';

export default class RadioGroup extends React.Component {
  render() {
    const {datasource, ...passThroughConfig} = this.props;
    return (
      <Radio.Group  {...passThroughConfig}>
        {
          datasource.map(item => <Radio key={item.value} value={item.value}>{item.label}</Radio>)

        }
      </Radio.Group>
    );
  }
}
