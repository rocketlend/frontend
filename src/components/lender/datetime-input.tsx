import { DateTime } from "luxon";
import { Listbox, ListboxLabel, ListboxOption } from "../listbox";
import { Description, Field } from "../fieldset";

const timeOptions = [
  { label: "30 Minutes", unit: { minutes: 30 } },
  { label: "1 Hour", unit: { hours: 1 } },
  { label: "1 Day", unit: { days: 1 } },
  { label: "1 Week", unit: { weeks: 1 } },
  { label: "1 Month", unit: { months: 1 } },
  { label: "1 Year", unit: { years: 1 } },
];

const dateTimeInput = ({ name }: { name: string }) => {
  return (
    <Field>
      <Listbox name={name}>
        {timeOptions.map((option, idx) => (
          <ListboxOption key={idx} value={option.unit}>
            <ListboxLabel>{option.label}</ListboxLabel>
          </ListboxOption>
        ))}
      </Listbox>
      <Description>{/*TODO indicate the date/time that corresponds with selected option*/}</Description>
    </Field>
  );
};
