import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
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

const formatDuration = (d: luxon.Duration) => {
  const d1 = d.rescale().shiftTo("years", "months", "weeks", "days").normalize().toObject();
  const d2 = Duration.fromDurationLike(Object.fromEntries(Object.entries(d1).filter(([k, v]) => v)));
  return d2.toHuman({maximumFractionDigits: 0});
};

const DateTimeInput = ({
  name,
  setSeconds,
}: {
  name: string;
  setSeconds: Dispatch<SetStateAction<number>>;
}) => {
  const [selectedTime, setSelectedTime] = useState<luxon.DateTime>(DateTime.now().plus({ years: 1}));
  const [dateString, setDateString] = useState<string>(DateTime.now().toFormat("yyyy-MM-dd'T'HH:mm"));
  const [isOpen, setIsOpen] = useState(false);

  const handleSelection = (value: luxon.DurationLike) => {
    if (value === null) {
      setIsOpen(true);
    } else {
      const time = DateTime.now().plus(value);
      setSelectedTime(time);
      setSeconds(time.toSeconds());
    }
  };

  const handleCustomSubmit = () => {
    const time = DateTime.fromISO(dateString);
    setSelectedTime(time);
    setSeconds(time.toSeconds());
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
        <p>Ending at: {selectedTime.toLocaleString(DateTime.DATETIME_FULL)}</p>
        <p>({formatDuration(selectedTime.diffNow())} from now)</p>
      </Description>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <DialogTitle>Custom Loan Duration</DialogTitle>
        <DialogBody>
        <input
          type="datetime-local"
          value={dateString}
          onChange={(e) => setDateString(e.target.value)}
        />
        </DialogBody>
        <DialogActions>
          <Button plain onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleCustomSubmit} {...{disabled: !dateString}}>Set Duration</Button>
        </DialogActions>
      </Dialog>
    </Field>
  );
};

export default DateTimeInput;
