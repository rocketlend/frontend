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
    <form
      action=""
      method=""
      className="sm:flex sm:flex-col gap-8 space-y-8 rounded-xl p-6 sm:mx-auto sm:max-w-prose border border-zinc-800 bg-zinc-800/40"
    >
      <Fieldset>
        <Legend>
          <h2 className="text-xl">Change lender address</h2>
        </Legend>
        <Text className="italic">
          {"[Maybe say something here about why you'd want to do this]"}
        </Text>
        <FieldGroup>
          {/* TODO fix spacing/alignment */}
          <div className="grid grid-cols-1 gap-8 sm:gap-4">
            <Field>
              <Label>New address</Label>
              <Input name="new_address" />
            </Field>
            <CheckboxField>
              {/* TODO default checked */}
              <Label>Require confirmation</Label>
              <Checkbox
                defaultChecked
                aria-label="Require confirmation"
                name="require_confirmation"
              />
            </CheckboxField>
          </div>
        </FieldGroup>
      </Fieldset>
      <Button className="cursor-pointer self-center">Submit</Button>
    </form>
  );
};

export default ChangeAddress;
