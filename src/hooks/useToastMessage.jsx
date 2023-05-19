import { useToast } from "@chakra-ui/react";

const useToastMessage = () => {
  const toast = useToast();

  const showToastMessage = (title, description, status, colorScheme) => {
    toast({
      title: title,
      description: description,
      status: status,
      duration: 5000,
      isClosable: true,
      variant: "solid",
      colorScheme: colorScheme,
      position: "bottom",
    });
  };

  return { showToastMessage };
};

export default useToastMessage;
