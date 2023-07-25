import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom"; // Assuming you're using React Router
import { motion } from "framer-motion";

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
        <Heading as="h1" size="2xl" mb={4} color="teal.500">
          404 - Page Not Found
        </Heading>
        <Text fontSize="xl" mb={8}>
          Oops! It looks like you've taken a wrong turn.
        </Text>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <Box
          bg="teal.500"
          borderRadius="full"
          p={4}
          display="inline-block"
          mb={8}
        >
          <Text fontSize="xl" color="white" fontWeight="bold">
            Lost in the
          </Text>
          <Text fontSize="3xl" color="white" fontWeight="bold">
            Multiverse?
          </Text>
        </Box>
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
            colorScheme="teal"
            size="lg"
            px={8}
            py={4}
            fontWeight="bold"
            boxShadow="lg"
            _hover={{ boxShadow: "xl" }}
          >
            Take Me Home
          </Button>
        </motion.div>
      </motion.div>
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <Box mt={8}>
          <Text fontSize="md" color="gray.500">
            Don't worry, our team of interdimensional engineers is on it!
          </Text>
        </Box>
      </motion.div>
    </Box>
  );
};

export default ErrorPage;
