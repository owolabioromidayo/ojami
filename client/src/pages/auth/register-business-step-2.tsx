import { FC } from "react";
import { useBreakpointValue } from "@chakra-ui/react";
import RegisterBusinessTwoMobile from "@/components/mobile/RegisterBusinessTwo";

interface RegisterStepTwoProps {}

const RegisterStepTwo: FC<RegisterStepTwoProps> = ({}) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  return <>{isMobile && <RegisterBusinessTwoMobile />}</>;
};

export default RegisterStepTwo;
