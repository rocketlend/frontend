import {
  Description,
  Field,
  FieldGroup,
  Fieldset,
  Label,
  Legend,
} from "../fieldset";
import { Text, Strong } from "../text";
import { Input } from "../input";
import { Button } from "../button";
import { Radio, RadioField, RadioGroup } from "../radio";

const CreateLendingPool = () => {
  const showBorrowerList = () => {
    // TODO
  };

  return (
    <form>
      <Fieldset>
        <Legend>Create lending pool</Legend>
        <FieldGroup>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-4">
            <Field>
              <Label>Interest rate</Label>
              <Input name="interest_rate" />
            </Field>
            <Field>
              <Label>End time</Label>
              <Input name="end_time" />
            </Field>
            <Field>
              <Label>{"Initial RPL supply (optional)"}</Label>
              {/* TODO indicate how much RPL is approved/available */}
              <Input name="rpl_supply" />
            </Field>
            <Field>
              <Label>{"Transfer allowance (optional)"}</Label>
              <Input name="transfer_allowance" />
            </Field>
            <RadioGroup defaultValue="allow_all">
              <RadioField>
                <Radio value="allow_all" />
                <Label>Allow all borrowers</Label>
              </RadioField>
              <RadioField>
                <Radio value="allow_some" onChange={showBorrowerList}/>
                <Label>Specify a list of allowed borrowers</Label>
              </RadioField>
            </RadioGroup>
          </div>
        </FieldGroup>
      </Fieldset>
      <Button className="cursor-pointer">Submit</Button>
    </form>
  );
};

export default CreateLendingPool;
