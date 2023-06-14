import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Tag,
} from "@chakra-ui/react";
import { useContext } from "react";
import { VentifyContext } from "../context/VentifyContextProvider";
import color from "../styles/colors";

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
        <DrawerHeader>
          <Tag size="lg" variant="solid" backgroundColor={color.primary}>
            {loggedInBatchYear}
          </Tag>
        </DrawerHeader>

        <DrawerBody></DrawerBody>

        <DrawerFooter>
          <Button
            variant="outline"
            mr={3}
            onClick={onAccountDrawerClose}
            colorScheme="purple"
            textTransform="capitalize"
            size="md"
          >
            close
          </Button>
          <Button
            colorScheme="red"
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
