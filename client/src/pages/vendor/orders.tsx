import type { ReactElement } from "react";
import {
  Box,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  TabIndicator,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import { useViewportHeight } from "@/utils/hooks/useViewportHeight";
import VendorLayout from "@/components/mobile/layout/VendorLayout";
import type { NextPageWithLayout } from "../_app";

const Orders: NextPageWithLayout<{}> = () => {
  useViewportHeight();
  const tabs = ["new", "delivering", "completed", "cancelled"];
  const newItems = [
    {
      id: 799,
      item: "samsung galaxy mode dekdednedibefbfefu",
      quantity: 2,
      price: 305000,
    },
    {
      id: 799,
      item: "samsung galaxy",
      quantity: 2,
      price: 305000,
    },
    {
      id: 799,
      item: "samsung galaxy",
      quantity: 2,
      price: 305000,
    },
    {
      id: 799,
      item: "samsung galaxy",
      quantity: 2,
      price: 305000,
    },
    {
      id: 799,
      item: "samsung galaxy",
      quantity: 2,
      price: 305000,
    },
    {
      id: 799,
      item: "samsung galaxy",
      quantity: 2,
      price: 305000,
    },
    {
      id: 799,
      item: "samsung galaxy",
      quantity: 2,
      price: 305000,
    },
    {
      id: 799,
      item: "samsung galaxy",
      quantity: 2,
      price: 305000,
    },
  ];

  return (
    <Box
      height="calc(var(--vh, 1vh) * 100 - 60px)"
      w="100vw"
      backgroundImage={"/images/mobile/bgs/orders-bg.svg"}
      backgroundPosition={"center"}
      backgroundSize={"cover"}
      backgroundRepeat={"no-repeat"}
      px={"0.8rem"}
      overflowY={"auto"}
    >
      <Heading as={"h1"} size={"lg"} fontWeight={"semibold"} pt={"3rem"}>
        Orders Received
      </Heading>

      <Box mt={"0.5rem"} pb={"0.5rem"}>
        <Tabs position="relative" variant="unstyled">
          <TabList w={"fit-content"}>
            {tabs.map((tab, index) => (
              <Tab
                fontWeight={"semibold"}
                key={index}
                _selected={{ color: "#EF8421" }}
                fontSize={"xs"}
                color={"#B0B0B0"}
              >
                {tab}
              </Tab>
            ))}
          </TabList>
          <TabIndicator
            mt="-5px"
            height="2px"
            bg="#EF8421"
            borderRadius="1px"
            color={"#EF8421"}
          />
          <TabPanels>
            <TabPanel p={0}>
              <Box
                border="2px solid #000000"
                rounded="2xl"
                overflowX="hidden"
                mt={"1rem"}
              >
                <Table variant="unstyled" size={"xs"} w={"full"} maxH={"65vh"}>
                  <Thead backgroundColor={"#D9D9D9"} fontSize={"2xs"}>
                    <Tr>
                      <Th px={2} py={2} textTransform={"none"}>
                        id
                      </Th>
                      <Th textTransform={"none"}>item</Th>
                      <Th textTransform={"none"}>quantity</Th>
                      <Th textTransform={"none"}>price</Th>
                      <Th textTransform={"none"}>actions</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {newItems.map((item, index) => (
                      <Tr
                        fontSize={"xs"}
                        fontWeight={"semibold"}
                        key={index}
                        border={"2px solid #000000"}
                        borderLeft={"0px"}
                        borderRight={"0px"}
                        borderBlockEnd={"0px"}
                      >
                        <Td py={4} px={2}>
                          #{item.id}
                        </Td>
                        <Td pr={"1rem"} isTruncated maxW={"70px"}>
                          {item.item}
                        </Td>
                        <Td>{item.quantity}</Td>
                        <Td>{item.price}</Td>
                        <Td>see details</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Box>
            </TabPanel>
            <TabPanel>
              <p>two!</p>
            </TabPanel>
            <TabPanel>
              <p>three!</p>
            </TabPanel>
            <TabPanel>
              <p>one!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};

Orders.getLayout = function getLayout(page: ReactElement) {
  return <VendorLayout>{page}</VendorLayout>;
};

export default Orders;
