import type { ColumnsType } from 'antd/es/table';
import { Table } from 'antd';

interface DataType {
    id: number;
    postId: number;
    name: string;
    email: string;
    body: string;
  }

interface TableComponentProps {
  data: DataType[];
  error: string | null;
}

const columns: ColumnsType<DataType> = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'postId',
      dataIndex: 'postId',
      key: 'postId',
    },
    {
      title: 'name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'body',
      dataIndex: 'body',
      key: 'body',
    },
  ];
  
  export default function TableComponent({ data, error }: TableComponentProps): React.ReactElement {
    if (error) {
      return <div>{error}</div>;
    }
    return(
        <Table<DataType> columns={columns} dataSource={data} />
    )
  }
  