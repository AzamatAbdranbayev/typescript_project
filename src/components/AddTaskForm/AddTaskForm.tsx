import React from "react";
import "antd/dist/antd.css";
import { Button, Input } from "antd";
import { Row, Col } from "react-flexbox-grid";
import { SendOutlined } from "@ant-design/icons";
import { actions, state } from "../../store/taskStore";
import { observer } from "mobx-react";
const { TextArea } = Input;


const AddTaskForm: React.FC = observer(() => {
  const handlerChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    actions.addTaskValue(event.target.value);
  };
  const handlerSubmitTaskValue = () => {
    actions.addTask();
    actions.addTaskValue("");
  };
  return (
    <>
      <Row middle="xs">
        <Col xs={6}>
          <TextArea
            value={state.valueNewTask}
            onChange={handlerChange}
            placeholder="please entry the value"
          ></TextArea>
        </Col>
        <Col xs={2}>
          <Button
            onClick={handlerSubmitTaskValue}
            type="primary"
            ghost
            icon={<SendOutlined />}
          >
            Add
          </Button>
        </Col>
      </Row>
    </>
  );
});

export default AddTaskForm;
