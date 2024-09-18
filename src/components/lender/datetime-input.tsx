import { useState } from "react";
import { DateTime, Duration } from "luxon";
import { Listbox, ListboxLabel, ListboxOption } from "../listbox";
import { Description, Field } from "../fieldset";
import { Dialog, DialogBody, DialogTitle, DialogActions } from "../dialog";
import { Button } from "../button";

type timeOption = { label: string; timeToAdd: luxon.DurationLike };

const timeOptions: timeOption[] = [
  { label: "1 Month", timeToAdd: { months: 1 } },
  { label: "3 Months", timeToAdd: { months: 3 } },
  { label: "6 Months", timeToAdd: { months: 6 } },
  { label: "1 Year", timeToAdd: { years: 1 } },
  { label: "3 Years", timeToAdd: { years: 3 } },
];

const DateTimeInput = ({ name }: { name: string }) => {
  const [selected, setSelected] = useState<luxon.DurationLike>({ years: 1 });
  const [customValue, setCustomValue] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSelection = (value: luxon.DurationLike) => {
    if (value === null) {
      setIsOpen(true);
    } else {
      setSelected(value);
    }
  };

  const handleCustomSubmit = () => {
    setSelected(DateTime.fromISO(customValue).diffNow().normalize());
    setIsOpen(false);
  };

  return (
    <Field>
      <Listbox
        name={name}
        onChange={handleSelection}
        placeholder="1 Year"
        defaultValue={timeOptions[3].timeToAdd}
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
        <p>Ending at: {DateTime.now().plus(Duration.fromDurationLike(selected)).toLocaleString(DateTime.DATETIME_FULL)}</p>
        <p>({Duration.fromDurationLike(selected).toHuman()} from now)</p>
      </Description>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <DialogTitle>Custom Loan Duration</DialogTitle>
        <DialogBody>
        {/*TODO: fill in with now or current value; also ensure filled before submit*/}
        <input type="datetime-local" onChange={(e) => setCustomValue(e.target.value)} />
        </DialogBody>
        <DialogActions>
          <Button plain onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleCustomSubmit}>Set Duration</Button>
        </DialogActions>
      </Dialog>
    </Field>
  );
};

export default DateTimeInput;
