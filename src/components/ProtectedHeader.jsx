import {
  Flex,
  Button,
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
  Divider,
  Icon,
} from "@chakra-ui/react";
import { AddIcon, HamburgerIcon } from "@chakra-ui/icons";
import { FaUser } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import { MdOutlinePoll } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import Logo from "./Logo";

const ProtectedHeader = (props) => {
  const {
    onAccountDrawerOpen,
    logout,
    onPasswordResetDialogOpen,
    openCreationModal,
  } = props;
  return (
    <>
      <Flex alignItems="center" justifyContent="space-between" padding="0 20px">
        <Logo />

        <Flex>
          <Button
            textTransform="capitalize"
            variant="solid"
            size="md"
            colorScheme="purple"
            rightIcon={<AddIcon boxSize="13px" />}
            onClick={() => openCreationModal("confession")}
            marginRight="15px"
          >
            confess
          </Button>

          <Button
            textTransform="capitalize"
            variant="outline"
            size="md"
            colorScheme="purple"
            rightIcon={<MdOutlinePoll size="18px" />}
            marginRight="15px"
            onClick={() => openCreationModal("poll")}
          >
            poll
          </Button>

          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Menu"
              icon={<HamburgerIcon />}
              variant="outline"
              colorScheme="gray"
              size="md"
            />

            <MenuList>
              <MenuGroup title="Profile">
                <MenuItem
                  onClick={onAccountDrawerOpen}
                  icon={<Icon as={FaUser} />}
                >
                  My Account
                </MenuItem>
              </MenuGroup>
              <MenuDivider />
              <MenuGroup title="Help">
                <MenuItem
                  onClick={onPasswordResetDialogOpen}
                  icon={<Icon as={RiLockPasswordFill} />}
                >
                  Reset Password
                </MenuItem>
                <MenuItem
                  color="red"
                  onClick={logout}
                  icon={<Icon as={TbLogout} />}
                >
                  Logout
                </MenuItem>
              </MenuGroup>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
      <Divider orientation="horizontal" />
    </>
  );
};

export default ProtectedHeader;
