import { ColorRangeSelector } from '@antv/insight-component';
import type { ColorRange } from '@antv/insight-component/src/components/formily/ColorRangeSelector/AntdColorRangeSelector/constants/color-ranges';
import { Form, FormItem } from '@formily/antd';
import type { Form as FormInstance } from '@formily/core';
import { createForm, onFormValuesChange } from '@formily/core';
import { createSchemaField, FormConsumer } from '@formily/react';
import 'antd/dist/antd.css';
import React from 'react';

const RIBBON_LIST: ColorRange[] = [
  {
    type: 'sequential',
    colors: [
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

  {
    type: 'singlehue',
    colors: [
      'rgb(247, 252, 253)',
      'rgb(229, 245, 249)',
      'rgb(204, 236, 230)',
      'rgb(153, 216, 201)',
      'rgb(102, 194, 164)',
      'rgb(65, 174, 118)',
      'rgb(35, 139, 69)',
      'rgb(0, 109, 44)',
      'rgb(0, 68, 27)',
    ],
  },
];

const form = createForm({
  initialValues: {
    colorRibbon: {
      colors: [
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
      isReversed: false,
    },
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
    ColorRangeSelector,
  },
});

const schema = {
  type: 'object',
  properties: {
    colorRibbon: {
      type: 'string',
      title: '颜色',
      'x-decorator': 'FormItem',
      'x-component': 'ColorRangeSelector',
      'x-component-props': {},
      'x-decorator-props': {},
      // enum: [...RIBBON_LIST],
    },
  },
};

export default () => {
  return (
    <Form form={form} style={{ width: '300px' }}>
      <SchemaField schema={schema} />
      <FormConsumer>
        {() => (
          <code>
            <pre>{JSON.stringify(form.values, null, 2)}</pre>
          </code>
        )}
      </FormConsumer>
    </Form>
  );
};
