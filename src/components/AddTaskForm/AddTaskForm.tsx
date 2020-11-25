import React, { useState } from 'react';
import axios from 'axios';
import 'antd/dist/antd.css';
import { Button, Input, Alert } from 'antd';
import { Row, Col } from 'react-flexbox-grid';
import { SendOutlined } from '@ant-design/icons';
import {actions,state} from "../../store/taskStore";
const { TextArea } = Input;

interface AddTaskFormpProps {

}
const AddTaskForm: React.FC<AddTaskFormpProps> = () => {
  const [taskValue, setTaskValue] = useState('');
  const [visible, setVisible] = useState(false);

  const handlerChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    // setTaskValue(event.target.value);
    actions.addTaskValue(event.target.value)
  };
  const handlerSubmitTaskValue = () => {
    // if (taskValue !== '') {
    //   axios({
    //     method: 'POST',
    //     url: 'https://todo-ps-b0113.firebaseio.com/task.json',
    //     data: {
    //       id: Date.now(),
    //       title: taskValue,
    //     },
    //   }).then(() => {
    //     change();
    //     setTaskValue('');
    //   });
    // } else {
    //   setVisible(true);
    // }
    actions.addTask()
  };
  return (
    <>
      {visible ? (
        <Alert
          message="Error"
          description="Empty value"
          type="error"
          closable
          afterClose={() => setVisible(false)}
        />
      ) : null}
      <Row middle="xs">
        <Col xs={6}>
          <TextArea
            value={state.valueNewTask}
            onChange={handlerChange}
            placeholder="please entry the value"
          ></TextArea>
        </Col>
        <Col xs={2}>
          <Button onClick={handlerSubmitTaskValue} type="primary" ghost icon={<SendOutlined />}>
            Add
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default AddTaskForm;
