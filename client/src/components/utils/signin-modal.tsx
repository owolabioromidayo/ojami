// @ts-nocheck

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  Icon,
  useDisclosure,
  Flex,
  ModalHeader,
  ModalCloseButton,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Link,
  Tabs,
  TabPanels,
  TabPanel,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { IoKeyOutline } from "react-icons/io5";
import { MdAlternateEmail } from "react-icons/md";
import FancyButton from "../ui/fancy-button";

interface SignInProps {
  isOpen: boolean;
  onClose: () => void;
}


export const SignInModal: React.FC<SignInProps> = ({ isOpen, onClose }) => {
  const { isOpen: isMOpen, onToggle } = useDisclosure();
  const [index, setIndex] = useState(0);
  const toast = useToast()


  return (
    <Modal
      isCentered
      onClose={() => {
        onClose();
        isMOpen === true ? onToggle() : null;
      }}
      isOpen={isOpen}
      motionPreset="slideInBottom"
      size="xl"
    >
      <ModalOverlay />
      <ModalContent rounded="20px" border="2px solid #000" px={1} py={5}>
        <ModalCloseButton rounded="full" border="1px solid #000" />
        <ModalBody>
          <Tabs index={index}>
            <TabPanels>
              <TabPanel>
                <ModalHeader textAlign="center">
                  <Text fontSize={24} mb={2}>
                    Sign In
                  </Text>
                  <Text fontWeight={400} fontSize={15}>
                    Sign in to continue
                  </Text>
                </ModalHeader>
                <Formik
                  initialValues={{ email: "", password: "" }}
                  onSubmit={async (values, actions) => {
                    const response = await fetch("http://localhost:4000/api/auth/users/login", {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json'},
                      body: JSON.stringify({phoneOrEmail: values.email, password: values.password}),
                      credentials: 'include'
                    })
                    const data = await response.json()
                    if(!response.ok){
                      toast({
                        title: 'Login Error',
                        description: `${data.errors[0].message}`,
                        status: 'error',
                        duration: 5000,
                        position: 'top',
                        containerStyle: { border: "2px solid #000", rounded: "md"},
                      })
                    }else{
                      toast({
                        title: 'Login Successful',
                        description: "Welcome back to your account",
                        status: 'success',
                        duration: 5000,
                        position: 'top',
                        containerStyle: { border: "2px solid #000", rounded: "md" }
                      })
                      setTimeout(() => {
                        window.location.reload()
                      }, 700)
                    }
                  }}
                >
                  {(props) => (
                    <Form>
                      <Field name="email">
                        {({ field, form }: any) => (
                          <FormControl
                            isInvalid={form.errors.email && form.touched.email}
                          >
                            <FormLabel>Email</FormLabel>
                            <InputGroup>
                              <InputLeftElement
                                pointerEvents="none"
                                py={"34px"}
                              >
                                <Icon as={MdAlternateEmail} />
                              </InputLeftElement>
                              <Input
                                {...field}
                                type="email"
                                border="2px solid #000"
                                rounded="12px"
                                py={8}
                                focusBorderColor="#EF8421"
                              />
                            </InputGroup>
                            <FormErrorMessage>
                              {form.errors.email}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>

                      <Field name="password">
                        {({ field, form }: any) => (
                          <FormControl mt={5}>
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                              <InputLeftElement
                                pointerEvents="none"
                                py={"34px"}
                              >
                                <Icon as={IoKeyOutline} />
                              </InputLeftElement>
                              <Input
                                {...field}
                                type="password"
                                border="2px solid #000"
                                rounded="12px"
                                py={8}
                                focusBorderColor="#EF8421"
                              />
                            </InputGroup>
                            <FormErrorMessage>
                              {form.errors.email}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Flex
                        align="center"
                        direction="column"
                        gap={3}
                        w="full"
                        mt={5}
                      >
                        <FancyButton
                          bg="/assets/buttons/oja-cloud-orange.svg"
                          w="280px"
                          h="90px"
                          fontWeight={700}
                          isLoading={props.isSubmitting}
                          type="submit"
                        >
                          Sign in
                        </FancyButton>
                        <Text fontWeight={600} color="#747474">
                          No Account?{" "}
                          <Link
                            color="#EF8421"
                            onClick={() => setIndex(index + 1)}
                          >
                            Sign Up
                          </Link>
                        </Text>
                      </Flex>
                    </Form>
                  )}
                </Formik>
              </TabPanel>
              <TabPanel>
                <ModalHeader textAlign="center">
                  <Text fontSize={24} mb={2}>
                    Sign Up
                  </Text>
                  <Text fontWeight={400} fontSize={15}>
                    Start your new shopping experience
                  </Text>
                </ModalHeader>
                <Formik
                  initialValues={{ firstName: "", lastName: "", phoneNumber: "", birthDate: "", email: "", password: "" }}
                  onSubmit={async (values, actions) => {
                    const response = await fetch("http://localhost:4000/api/auth/users/signup", {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json'},
                      body: JSON.stringify({firstname: values.firstName, lastname: values.lastName, email: values.email, phoneNumber: values.phoneNumber, birthDate: values.birthDate,  password: values.password}),
                      credentials: 'include'

                    })
                    const data = await response.json()
                    if(!response.ok){
                      toast({
                        title: 'Login Error',
                        description: `${data.errors[0].message}`,
                        status: 'error',
                        duration: 5000,
                        position: 'top',
                        containerStyle: { border: "2px solid #000", rounded: "md"},
                      })
                    }else{
                      toast({
                        title: 'Sign up Successful',
                        description: "Welcome to Ojà mi 🫶",
                        status: 'success',
                        duration: 5000,
                        position: 'top',
                        containerStyle: { border: "2px solid #000", rounded: "md" }
                      })
                      setTimeout(() => {
                        window.location.reload()
                      }, 700)
                    }
                  }}
                >
                  {(props) => (
                    <Form>
                      <Field name="firstName">
                        {({ field, form }: any) => (
                          <FormControl
                            isInvalid={
                              form.errors.firstName && form.touched.firstName
                            }
                          >
                            <FormLabel>Full Name</FormLabel>

                            <Input
                              {...field}
                              type="text"
                              placeholder="First Name"
                              border="2px solid #000"
                              rounded="12px 12px 0 0"
                              py={8}
                              focusBorderColor="#EF8421"
                            />

                            <FormErrorMessage>
                              {form.errors.firstName}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="lastName">
                        {({ field, form }: any) => (
                          <FormControl
                            isInvalid={
                              form.errors.lastName && form.touched.lastName
                            }
                          >
                            <Input
                              {...field}
                              type="text"
                              placeholder="Last Name"
                              border="solid #000"
                              borderWidth="0px 2px 2px 2px"
                              rounded="0 0 12px 12px"
                              py={8}
                              focusBorderColor="#EF8421"
                            />
                            <FormErrorMessage>
                              {form.errors.email}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>

                      <Field name="email">
                        {({ field, form }: any) => (
                          <FormControl
                            mt={5}
                            isInvalid={form.errors.email && form.touched.email}
                          >
                            <FormLabel>Email</FormLabel>
                              <Input
                                {...field}
                                type="email"
                                placeholder="example@gmail.com"
                                border="2px solid #000"
                                rounded="12px"
                                py={8}
                                focusBorderColor="#EF8421"
                              />
                            <FormErrorMessage>
                              {form.errors.email}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>

                      <Flex align="center" gap={4}>
                        <Field name="phoneNumber">
                            {({ field, form }: any) => (
                            <FormControl
                                mt={5}
                                isInvalid={
                                form.errors.phoneNumber &&
                                form.touched.phoneNumber
                                }
                            >
                                <FormLabel>Phone Number</FormLabel>

                                <Input
                                {...field}
                                type="number"
                                border="2px solid #000"
                                rounded="12px"
                                placeholder="08001234567"
                                py={8}
                                focusBorderColor="#EF8421"
                                />
                                <FormErrorMessage>
                                {form.errors.email}
                                </FormErrorMessage>
                            </FormControl>
                            )}
                        </Field>

                        <Field name="birthdate">
                            {({ field, form }: any) => (
                            <FormControl
                                mt={5}
                                isInvalid={
                                form.errors.birthdate &&
                                form.touched.birthdate
                                }
                            >
                                <FormLabel>Date of birth</FormLabel>

                                <Input
                                {...field}
                                type="date"
                                border="2px solid #000"
                                rounded="12px"
                                py={8}
                                focusBorderColor="#EF8421"
                                />
                                <FormErrorMessage>
                                {form.errors.birthdate}
                                </FormErrorMessage>
                            </FormControl>
                            )}
                        </Field>

                      </Flex>


                      <Field name="password">
                        {({ field, form }: any) => (
                          <FormControl mt={5}>
                            <FormLabel>Password</FormLabel>
                              <Input
                                {...field}
                                type="password"
                                placeholder="•••••••••••"
                                border="2px solid #000"
                                rounded="12px"
                                py={8}
                                focusBorderColor="#EF8421"
                              />
                            <FormErrorMessage>
                              {form.errors.password}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Flex
                        align="center"
                        direction="column"
                        gap={3}
                        w="full"
                        mt={5}
                      >
                        <FancyButton
                          bg="/assets/buttons/oja-cloud-orange.svg"
                          w="280px"
                          h="90px"
                          fontWeight={700}
                           isLoading={props.isSubmitting}
                          type="submit"
                        >
                          Sign up
                        </FancyButton>
                        <Text fontWeight={600} color="#747474">
                          Have an account?{" "}
                          <Link
                            color="#EF8421"
                            onClick={() => setIndex(index - 1)}
                          >
                            Sign In
                          </Link>
                        </Text>
                      </Flex>
                    </Form>
                  )}
                </Formik>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
