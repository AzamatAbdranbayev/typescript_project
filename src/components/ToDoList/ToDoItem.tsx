import React, { useState } from 'react';
import { Button, Input, Space, Typography } from 'antd';
import { DeleteOutlined, SaveOutlined } from '@ant-design/icons';
import {actions} from "../../store/taskStore"
const { TextArea } = Input;
const { Text } = Typography;

export interface Task {
  id: string;
  title: string;
}

interface P {
  idx: number;
  task: Task;
  remove: (id: string) => void;
  updateTask: (id: string) => void;
}

export function ToDoItem({ idx, task, updateTask, remove }: P) {
  const [valueChangedTask, setValueChangedTask] = useState(task.title);

  return (
    <div className="space-align-block" style={{ margin: '20px 0' }}>
      <Space align="center">
        <Text mark>#{idx}</Text>
        <TextArea
          onChange={(event) => actions.changeTaskValue(event.currentTarget.value)}
          defaultValue={task.title}
        />
        <Button
          onClick={() => updateTask(task.id)}
          type="primary"
          icon={<SaveOutlined />}
        >
          Update
        </Button>
        <Button onClick={() => remove(task.id)} danger icon={<DeleteOutlined />}>
          Delete
        </Button>
      </Space>
    </div>
  );
}
