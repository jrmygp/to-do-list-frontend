import { useState, useEffect } from "react";
import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import { axiosInstance } from "../config/api";

const TodoItem = ({ action, status, id, refreshList }) => {
  const [contentList, setContentList] = useState([]);
  const [inputAction, setInputAction] = useState("");
  const [inputStatus, setInputStatus] = useState("");

  const fetchTodoList = () => {
    axiosInstance.get("/todoLists").then((res) => {
      setContentList(res.data.result);
    });
  };

  const deleteList = () => {
    axiosInstance.delete(`/todoLists/${id}`).then(() => {
      refreshList()
    });
  };

  const handleActionInput = (event) => {
    const { value } = event.target;
    setInputAction(value);
  };

  const handleStatusInput = (event) => {
    const { value } = event.target;
    setInputStatus(value);
  };
  const editList = () => {
    const newList = {
      action: inputAction,
      status: inputStatus,
    };
    axiosInstance.patch(`todoLists/${id}`, newList).then(() => {
      refreshList()
    });
  };

  useEffect (() => {
      fetchTodoList();
    },[]);
  return (
    <Box
      mb={5}
      border="1px solid gray"
      padding="5px"
      borderRadius={8}
      maxW="450px"
    >
      <Text mr={5}>Action: {action}</Text>
      <Text mr={5} mb={2}>
        Status: {status}
      </Text>
      <Input placeholder="Action" onChange={handleActionInput} mb={2}></Input>
      <Input placeholder="Status" onChange={handleStatusInput} mb={2}></Input>
      <Button colorScheme="green" mr={3} onClick={() => editList(id)}>
        Edit
      </Button>
      <Button colorScheme="red" onClick={() => deleteList(id)}>
        Delete
      </Button>
    </Box>
  );
};

export default TodoItem;
