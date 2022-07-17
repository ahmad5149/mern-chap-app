import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  Toast,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState, useRef } from "react";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { ChatState } from "../../Context/ChatProvider";
import ProfileModel from "./ProfileModel";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ChatLoading from "../ChatLoading";
import UserListItem from "../UserAvatar/UserListItem";
function SideDrawer() {
  const [search, setSearch] = useState();
  const [searchResult, setSearchResult] = useState();
  const [loading, setLoading] = useState();
  const [loadingChat, setLoadingChat] = useState();

  const { user, setSelectedChat } = ChatState();

  let navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const toast = useToast();
  const logOutHandle = () => {
    localStorage.removeItem("userInfo");
    navigate("/", { replace: true });
  };
  const handleSearch = async () => {
    if (search === undefined || !search) {
      toast({
        title: "Please some words in search bar",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          authorization: `Bearer ${user.token}`,
          "Content-type": "application/json",
        },
      };

      const data = await axios.get(`/api/user?search=${search}`, config);
      setSearchResult(data);
      setLoading(false);
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

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${user.token}`,
        },
      };

      const data = await axios.post("/api/chat", { userId }, config);

      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
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

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        bg="#fff"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth={5}
        justifyContent="space-between"
      >
        <Tooltip label="Search User to chat" hasArrow placement="bottom">
          <Button onClick={onOpen} colorScheme="teal" variant="ghost">
            <i className="fa-solid fa-magnifying-glass"></i>
            <Text px={4} display={{ base: "none", md: "flex" }}>
              Search User
            </Text>
          </Button>
        </Tooltip>
        <Text fontSize="2xl" fontFamily="Work sance">
          Talk-A-Tive
        </Text>
        <div>
          <Menu>
            <MenuButton m={1}>
              <BellIcon></BellIcon>
            </MenuButton>
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              <Avatar
                size="sm"
                cursor="pointer"
                name={user.name}
                // src={user.pic}
              />
            </MenuButton>
            <MenuList>
              <ProfileModel user={user}>
                <MenuItem>My Profile</MenuItem>
              </ProfileModel>
              {/* <MenuDivider /> */}
              <MenuItem onClick={logOutHandle}>LogOut</MenuItem>
            </MenuList>
          </Menu>
        </div>
        <Drawer
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Search User</DrawerHeader>

            <DrawerBody>
              <Box display="flex">
                <Input
                  placeholder="Search By name or email"
                  mr={2}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Button onClick={handleSearch}>GO</Button>
              </Box>

              {loading ? (
                <ChatLoading />
              ) : (
                searchResult?.data?.map((user) => {
                  return (
                    <UserListItem
                      key={user._id}
                      user={user}
                      handleFunction={() => {
                        accessChat(user._id);
                      }}
                    />
                  );
                })
              )}
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Box>
    </>
  );
}

export default SideDrawer;
