import React from 'react';
import {Radio} from 'antd';

export default class RadioGroup extends React.Component {
  render() {
    const {dataSource, ...passThroughConfig} = this.props;
    return (
      <Radio.Group  {...passThroughConfig}>
        {
          dataSource.map(item => <Radio key={item.value} value={item.value}>{item.label}</Radio>)

        }
      </Radio.Group>
    );
  }
}
