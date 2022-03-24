import {
  Box,
  Flex,
  Heading,
  Center,
  Text,
  Button,
  Input,
  Stack,
} from "@chakra-ui/react";
import { axiosInstance } from "../../config/api";
import { useState, useEffect } from "react";
import TodoItem from "../../components/todoCard";

const todoList = () => {
  const [contentList, setContentList] = useState([]);
  const [newList, setNewList] = useState("");
  const [newStatus, setNewStatus] = useState("");

  const fetchTodoList = () => {
    axiosInstance.get("/todoLists").then((res) => {
      setContentList(res.data.result);
    });
  };

  const renderContentList = () => {
    return contentList?.map((val) => {
      return <TodoItem refreshList={fetchTodoList} action={val?.action} id={val?.id} status={val.status} />;
    });
  };

  const handleAction = (event) => {
    const { value } = event.target;
    setNewList(value);
  };

  const handleStatus = (event) => {
    const { value } = event.target;
    setNewStatus(value);
  };

  const addNewList = () => {
    const newData = {
      action: newList,
      status: newStatus,
    };
    axiosInstance.post("/todoLists", newData).then(() => {
      fetchTodoList();
    });
  };

  useEffect(() => {
    fetchTodoList();
  }, []);
  return (
    <Center mt={6}>
      <Stack>
        <Box border="1px solid black" maxW="450px" p="5px" borderRadius={8}>
            <Text mb={2} mr={4} fontWeight="bold" fontSize="lg">Add new list</Text>
          <Input placeholder="Input new list" onChange={handleAction} mb={2}></Input>
          <Input placeholder="Input new status" onChange={handleStatus} mb={2}></Input>

          <Flex>
            <Button colorScheme="blue" onClick={addNewList}>Add list</Button>
          </Flex>
        </Box>
        {renderContentList()}
      </Stack>
    </Center>
  );
};

export default todoList;
