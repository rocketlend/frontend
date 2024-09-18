import { useState } from "react";
import { DateTime } from "luxon";
import { Listbox, ListboxLabel, ListboxOption } from "../listbox";
import { Description, Field } from "../fieldset";
import { Dialog, DialogBody, DialogTitle, DialogActions } from "../dialog";
import { Button } from "../button";

type timeOption = { label: string; timeToAdd: luxon.DurationLike };

const timeOptions: timeOption[] = [
  { label: "30 Minutes", timeToAdd: { minutes: 30 } },
  { label: "1 Hour", timeToAdd: { hours: 1 } },
  { label: "1 Day", timeToAdd: { days: 1 } },
  { label: "1 Week", timeToAdd: { weeks: 1 } },
  { label: "1 Month", timeToAdd: { months: 1 } },
  { label: "1 Year", timeToAdd: { years: 1 } },
];

const DateTimeInput = ({ name }: { name: string }) => {
  const [selected, setSelected] = useState<luxon.DurationLike>({ months: 1 });
  const [datetime, setDatetime] = useState(DateTime.now());
  const [isOpen, setIsOpen] = useState(false);

  const handleSelection = (value: luxon.DurationLike) => {
    if (value === null) {
      setIsOpen(true);
    } else {
      setSelected(value);
    }
  };

  const handleCustomSubmit = () => {
    setSelected({seconds: 0});
    setDatetime(DateTime.now()); // TODO make this actually use the value from the dialog
    setIsOpen(false);
  };

  return (
    <Field>
      <Listbox
        name={name}
        onChange={handleSelection}
        placeholder="1 Month"
        defaultValue={timeOptions[4].timeToAdd}
      >
        {timeOptions.map((option, idx) => (
          <ListboxOption key={idx} value={option.timeToAdd}>
            <ListboxLabel>{option.label}</ListboxLabel>
          </ListboxOption>
        ))}
        <ListboxOption key="custom" value={null}>
          <ListboxLabel>Custom</ListboxLabel>
        </ListboxOption>
      </Listbox>
      <Description>
        {/*TODO indicate the date/time that corresponds with selected option*/}
      </Description>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <DialogTitle></DialogTitle>
        <DialogBody></DialogBody>
        <DialogActions>
          <Button plain onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleCustomSubmit}>Set custom date</Button>
        </DialogActions>
      </Dialog>
    </Field>
  );
};

export default DateTimeInput;
