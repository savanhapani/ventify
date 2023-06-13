import { useToast } from "@chakra-ui/react";

const useToastMessage = () => {
  const toast = useToast();
  const colorSchemes = {
    success: "purple",
    error: "red",
    warning: "yellow",
  };

  const showToastMessage = (title, description, status) => {
    toast({
      title: title,
      description: description,
      status: status,
      duration: 5000,
      isClosable: true,
      variant: "solid",
      colorScheme: colorSchemes[status],
      position: "bottom",
    });
  };

  return { showToastMessage };
};

export default useToastMessage;
