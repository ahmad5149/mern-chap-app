import { useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { ChatState } from "../../Context/ChatProvider";

const MyChats = () => {
  const [loggedUser, setLoggedUser] = useState();
  const { user, setSelectedChat, selectedChat, setChats, chats } = ChatState();

  const toast = useToast();
  const fetchChat = async () => {
    try {
      const config = {
        headers: {
          authorization: `Bearer ${user.token}`,
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.get("/api/chat", config);
      setChats(data);
    } catch (error) {
      toast({
        title: "API request failed",
        status: "error",
        description: error.message,
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });
    }
  };
  return <div>MyChats</div>;
};

export default MyChats;
