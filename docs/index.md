---
title: 开始
order: 0
---

## 📦 安装

```bash
# Install pre dependencies
$ npm install antd @ant-design/icons @formily/core @formily/react @formily/antd

# Install component
$ npm install @antv/insight-component
```

## 🔨 使用

```tsx | pre
import { ColorPicker, RibbonSelect } from '@antv/insight-component';
import { Form, FormItem } from '@formily/antd';
import { createForm, onFormValuesChange } from '@formily/core';
import { createSchemaField } from '@formily/react';
import 'antd/dist/antd.css';
import React from 'react';

const form = createForm({
  initialValues: {
    fillColor: '#F7664E',
    colorRibbon: [
      'rgb(247, 251, 255)',
      'rgb(222, 235, 247)',
      'rgb(198, 219, 239)',
      'rgb(158, 202, 225)',
      'rgb(107, 174, 214)',
      'rgb(66, 146, 198)',
      'rgb(33, 113, 181)',
      'rgb(8, 81, 156)',
      'rgb(8, 48, 107)',
    ],
  },
  effects() {
    onFormValuesChange((formIns: FormInstance<any>) => {
      console.log('formIns.values: ', formIns.values);
    });
  },
});

const SchemaField = createSchemaField({
  components: {
    FormItem,
    ColorPicker,
    RibbonSelect,
  },
});

const schema = {
  type: 'object',
  properties: {
    fillColor: {
      type: 'string',
      title: '颜色',
      'x-decorator': 'FormItem',
      'x-component': 'ColorPicker',
      'x-component-props': {
        placeholder: '颜色',
      },
      'x-decorator-props': {},
    },
    colorRibbon: {
      type: 'string',
      title: '色带',
      'x-decorator': 'FormItem',
      'x-component': 'RibbonSelect',
      'x-component-props': {},
      'x-decorator-props': {},
      enum: [],
    },
  },
};

export default () => {
  return (
    <Form form={form} style={{ width: '300px' }}>
      <SchemaField schema={schema} />
    </Form>
  );
};
```

## 本地开发

```bash
# Install project dependencies
$ npm install

# Run website
$ npm run start

# Run lint & unit tests
$ npm run ci

# Compile package
$ npm run build
```

## 许可证

MIT@[AntV](https://github.com/antvis).
