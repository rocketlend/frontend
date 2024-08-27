import {
  Description,
  Field,
  FieldGroup,
  Fieldset,
  Label,
  Legend,
} from "../fieldset";
import { Text } from "../text";
import { Input } from "../input";
import { Checkbox, CheckboxField } from "../checkbox";
import { Button } from "../button";

// TODO styles, maybe descriptions/tooltips
const ChangeAddress = () => {
  return (
    <form action="" method="">
      <Fieldset>
        <Legend>Change lender address</Legend>
        <Text className="italic">
          {"[Maybe say something here about why you'd want to do this]"}
        </Text>
        <FieldGroup>
          <Field>
            <Label>New address</Label>
            <Input name="new_address" />
          </Field>
          <CheckboxField>
            <Label>Require confirmation</Label>
            <Checkbox aria-label="Require confirmation" name="require_confirmation"/>
          </CheckboxField>
        </FieldGroup>
        <Button>Submit</Button>
      </Fieldset>
    </form>
  );
};

export default ChangeAddress;
