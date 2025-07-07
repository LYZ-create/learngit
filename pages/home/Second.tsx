import { Drawer,Form,Input,Button, Space, message } from 'antd';
import { useState } from 'react';

interface DataType {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

interface DrawerComponentProps {
  onAddData: (newData: DataType) => void;
}

export default function DrawerComponent({ onAddData }: DrawerComponentProps){
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    
    const showDrawer = () => {
        setOpen(true);
    };
    
    const onClose = () => {
        setOpen(false);
        form.resetFields();
    };

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            const newData: DataType = {
                id: parseInt(values.id),
                postId: parseInt(values.postId),
                name: values.name,
                email: values.email,
                body: values.body
            };
            onAddData(newData);
            message.success('数据添加成功！');
            onClose();
        } catch (error) {
            message.error('请填写所有必填字段！');
        }
    };
      
    return(
        <div>
            <Button type='primary' htmlType='submit' onClick={showDrawer}>新增</Button>
            <Drawer
                title="Create a new account"
                width={720}
                onClose={onClose}
                open={open}
                extra={
                    <Space>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button onClick={handleSubmit} type="primary">
                            Submit
                        </Button>
                    </Space>
                }
            >
                <Form 
                    form={form}
                    layout='vertical'
                    style={{maxWidth:600}}
                >
                    <Form.Item name='id' label='id' labelCol={{span:12}} wrapperCol={{span:14}} rules={[{ required: true, message: '请输入id' }]}>
                        <Input placeholder='请输入id' />
                    </Form.Item>
                    <Form.Item name='postId' label='postId' labelCol={{span:12}} wrapperCol={{span:14}} rules={[{ required: true, message: '请输入postId' }]}>
                        <Input placeholder='请输入postId' />
                    </Form.Item>
                    <Form.Item name='name' label='name' labelCol={{span:12}} wrapperCol={{span:14}} rules={[{ required: true, message: '请输入name' }]}>
                        <Input placeholder='请输入name' />
                    </Form.Item>
                    <Form.Item name='email' label='email' labelCol={{span:12}} wrapperCol={{span:14}} rules={[{ required: true, message: '请输入email' }]}>
                        <Input placeholder='请输入email' />
                    </Form.Item>
                    <Form.Item name='body' label='body' labelCol={{span:12}} wrapperCol={{span:14}} rules={[{ required: true, message: '请输入body' }]}>
                        <Input placeholder='请输入body' />
                    </Form.Item>
                </Form>
            </Drawer>
        </div>
    );
}