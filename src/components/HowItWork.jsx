import {
  Center,
  Card,
  Image,
  Stack,
  CardBody,
  Heading,
  Text,
} from "@chakra-ui/react";

const HowItWork = (props) => {
  const { title, description, image } = props;
  return (
    <Center>
      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="filled"
        padding="30px 70px"
        marginTop="50px"
        width="70vw"
      >
        <Image
          objectFit="contain"
          src={image}
          alt="ventify"
          width="150px"
          aspectRatio="1"
        />

        <Stack marginLeft="25px">
          <CardBody>
            <Heading size="md" textTransform="capitalize">
              {title}
            </Heading>

            <Text py="2">{description}</Text>
          </CardBody>
        </Stack>
      </Card>
    </Center>
  );
};

export default HowItWork;
