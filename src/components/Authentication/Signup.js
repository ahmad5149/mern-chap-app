import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [pic, setPic] = useState();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const handleClick = () => setShow(!show);
  let navigate = useNavigate();
  const postDetalis = (pic) => {
    if (pic === undefined) {
      toast({
        title: `Please select an image`,
        status: "warning",
        isClosable: true,
        position: "bottom",
        duration: 5000,
      });
      return;
    }
    if (pic.type === "image/jpeg" || pic.type === "image/png") {
      console.log("Uploaded");
      setLoading(false);
    }
  };

  const submitHandle = async () => {
    setLoading(true);
    if (!name || !email || !password || !confirmpassword) {
      toast({
        title: `Please fill all of the fields`,
        status: "warning",
        isClosable: true,
        position: "bottom",
        duration: 5000,
      });
      setLoading(false);
      return;
    }
    if (password !== confirmpassword) {
      toast({
        title: `Password not match!`,
        status: "warning",
        isClosable: true,
        position: "bottom",
        duration: 5000,
      });
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user",
        {
          name,
          email,
          password,
          pic,
        },
        config
      );
      toast({
        title: `User register successfully!`,
        status: "success",
        isClosable: true,
        position: "bottom",
        duration: 5000,
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("./chat", { replace: true });
    } catch (error) {
      toast({
        title: `Error while register user!`,
        description: error.response.data.message,
        status: "success",
        isClosable: true,
        position: "bottom",
        duration: 5000,
      });
      setLoading(false);
    }
  };
  return (
    <VStack spacing="5px">
      <FormControl id="first-name" isRequired>
        <FormLabel htmlFor="name">Name</FormLabel>
        <Input
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Enter your Name"
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Enter your Email"
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel htmlFor="password">Password</FormLabel>
        <InputGroup size="md">
          <Input
            onChange={(e) => setPassword(e.target.value)}
            type={show ? "text" : "password"}
            placeholder="Enter your Password"
          />

          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="c-password" isRequired>
        <FormLabel htmlFor="c-password">Confirm Password</FormLabel>
        <InputGroup size="md">
          <Input
            onChange={(e) => setConfirmpassword(e.target.value)}
            type={show ? "text" : "password"}
            placeholder="Enter your Password Again"
          />

          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="pic">
        <FormLabel>Upload Your Picture</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => postDetalis(e.target.value)}
        />
      </FormControl>

      <Button
        style={{ marginTop: 15 }}
        onClick={submitHandle}
        colorScheme="blue"
        w="100%"
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default Signup;
