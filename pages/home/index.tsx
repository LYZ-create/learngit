import { Form,Select,Input,Button, Space} from 'antd';
import DrawerComponent from './Second'; 
import TableComponent from './Box';
import { useState, useEffect } from 'react';
import axios from 'axios';

interface DataType {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export default function HomeIndex(){
  const [form] = Form.useForm();
  const [tableData, setTableData] = useState<DataType[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/comments');
        setTableData(response.data);
      } catch (err) {
        setError('Failed to fetch data');
        console.error('Error:', err);
      } 
    };

    fetchData();
  }, []);

  const addNewData = (newData: DataType) => {
    setTableData(prevData => [...prevData, newData]);
  };

  const onSortChange = (value: string) => {
    switch(value){
      case '升序':
        form.setFieldsValue({sort:'升序'});
        break;
      case '降序':
        form.setFieldsValue({sort:'降序'});
        break;
    }
  }
  const onTypeChange = (value: string) => {
    switch(value){
      case '全部':
        form.setFieldsValue({type:'全部'});
        break;
      case '已完成':
        form.setFieldsValue({type:'已完成'});
        break;
      case '未完成':
        form.setFieldsValue({type:'未完成'});
        break;
    }
  }
  return (
    <div>
    <Form
    layout='inline'
    form={form}
    initialValues={{sort:'升序',type:'全部',tag:''}}
    >
      <Space>
      <Form.Item name='sort' label='排序方式' labelCol={{span:12}} wrapperCol={{span:14}}>
        <Select options={[{label:'升序',value:'升序'},{label:'降序',value:'降序'}]} onChange={onSortChange}/>
      </Form.Item>
      <Form.Item name='type' label='列表状态' labelCol={{span:12}} wrapperCol={{span:14}}>
        <Select options={[{label:'全部',value:'全部'},{label:'已完成',value:'已完成'},{label:'未完成',value:'未完成'}]} onChange={onTypeChange}/>
      </Form.Item>
      <Form.Item name='tag' label='标签' labelCol={{span:8}} wrapperCol={{span:14}}>
        <Input placeholder='请输入标签' />
      </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit'>搜索</Button>
        </Form.Item>
      </Space>
      <DrawerComponent onAddData={addNewData}/>
    </Form>
    <TableComponent data={tableData} error={error}/>
    </div>
  )
}