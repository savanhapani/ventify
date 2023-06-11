import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
} from "@chakra-ui/react";
import { useContext } from "react";
import { VentifyContext } from "../context/VentifyContextProvider";

const AccountDrawer = (props) => {
  const { isAccountDrawerOpen, onAccountDrawerClose, logout } = props;

  const { loggedInBatchYear } = useContext(VentifyContext);

  return (
    <Drawer
      isOpen={isAccountDrawerOpen}
      placement="left"
      onClose={onAccountDrawerClose}
      size="xs"
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>{loggedInBatchYear}</DrawerHeader>

        <DrawerBody></DrawerBody>

        <DrawerFooter>
          <Button
            variant="outline"
            mr={3}
            onClick={onAccountDrawerClose}
            colorScheme="red"
            textTransform="capitalize"
            size="md"
          >
            close
          </Button>
          <Button
            colorScheme="purple"
            variant="solid"
            textTransform="capitalize"
            size="md"
            onClick={logout}
          >
            logout
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default AccountDrawer;
