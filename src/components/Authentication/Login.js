import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [show, setShow] = useState(false);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const handleClick = () => setShow(!show);
  let navigate = useNavigate();
  const submitHandle = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: `Please fill all of the fields!`,
        status: "warning",
        isClosable: true,
        position: "bottom",
        duration: 5000,
      });
      setLoading(false);
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );
      toast({
        title: `Login Successfully!`,
        status: "success",
        isClosable: true,
        position: "bottom",
        duration: 5000,
      });
      setLoading(false);
      navigate("./chat", { replace: true });
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      toast({
        title: `Invalid email or password!`,
        description: error.response.data.message,
        status: "warning",
        isClosable: true,
        position: "bottom",
        duration: 5000,
      });
      setLoading(false);
    }
  };
  return (
    <VStack spacing="5px">
      <FormControl id="email" isRequired>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Enter your Email"
          value={email}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel htmlFor="password">Password</FormLabel>
        <InputGroup size="md">
          <Input
            onChange={(e) => setPassword(e.target.value)}
            type={show ? "text" : "password"}
            placeholder="Enter your Password"
            value={password}
          />

          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        style={{ marginTop: 15 }}
        onClick={submitHandle}
        colorScheme="blue"
        w="100%"
      >
        Login
      </Button>
      <Button
        variant="solid"
        colorScheme="red"
        onClick={() => {
          setEmail("guest@example.com");
          setPassword("123456");
        }}
        w="100%"
      >
        Get Gust User Cradientials
      </Button>
    </VStack>
  );
};

export default Login;
