import React, { useEffect } from "react";
import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";
import { useNavigate } from "react-router-dom";
function Homepage() {
  let navigate = useNavigate();
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (userInfo) {
      navigate("/chat", { replace: true });
    }
  }, [navigate]);

  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        bg="#fff"
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text textAlign="center" fontSize="4xl">
          Talk-A-Tive
        </Text>
      </Box>
      <Box bg="#fff" w="100%" p={4} borderRadius="lg" borderWidth={1}>
        <Tabs variant="soft-rounded">
          <TabList colorscheme="blue">
            <Tab w="50%">Login</Tab>
            <Tab w="50%">SignUp</Tab>
          </TabList>
          <TabPanels mb="1em">
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}

export default Homepage;
