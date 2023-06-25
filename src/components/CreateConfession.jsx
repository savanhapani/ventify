import { FormControl, Textarea, FormHelperText } from "@chakra-ui/react";
import { CONFESSION_CHAR_LIMIT } from "../assets/data/data";
import color from "../styles/colors";

const CreateConfession = (props) => {
  const { initialRef, setConfession, confession } = props;
  return (
    <FormControl>
      <Textarea
        placeholder="Write your confession here..."
        focusBorderColor={color.primary}
        variant="outline"
        size="md"
        rows="5"
        maxLength={CONFESSION_CHAR_LIMIT}
        resize="none"
        ref={initialRef}
        onChange={(e) => setConfession(e.target.value)}
        value={confession}
      />
      <FormHelperText>
        {confession.length}/{CONFESSION_CHAR_LIMIT}
      </FormHelperText>
    </FormControl>
  );
};

export default CreateConfession;
