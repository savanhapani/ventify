import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import color from "../styles/colors";

const ErrorPage = () => {
  return (
    <Box
      textAlign="center"
      mt={10}
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <Heading as="h1" size="2xl" mb={4} color={color.primary}>
          404 - Page Not Found
        </Heading>
        <Text fontSize="xl" mb={8}>
          Oops! It seems the developer got lost in the code.
        </Text>
      </motion.div>

      <motion.div
        animate={{
          scale: [1, 1.2, 1.2, 1, 1],
          rotate: [0, 0, 270, 270, 0],
        }}
        transition={{ duration: 2, ease: "easeInOut" }}
        style={{ display: "inline-block" }}
      >
        <Button
          as={Link}
          to="/"
          colorScheme="purple"
          size="lg"
          px={8}
          py={4}
          fontWeight="bold"
          boxShadow="lg"
          _hover={{ boxShadow: "xl" }}
        >
          Save the Developer
        </Button>
      </motion.div>

      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <Box mt={8}>
          <Text fontSize="md" color="gray.500">
            Challenge: Can you find the right path in the code?
          </Text>
        </Box>
      </motion.div>
    </Box>
  );
};

export default ErrorPage;
