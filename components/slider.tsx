import React, { useState } from 'react';
import styles from '../styles/Home.module.css';

interface SliderComponentProps {
  min: number;
  max: number;
  onChange: (value: number) => void;
}

const SliderComponent: React.FC<SliderComponentProps> = ({ min, max, onChange }) => {
  const [value, setValue] = useState<number>(min);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value, 10);
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <div className={styles.sliderContainer}>
      <input 
        type="range" 
        min={min} 
        max={max} 
        value={value} 
        onChange={handleChange} 
        className={styles.slider}
      />
      <div className={styles.sliderValues}>
        <span>{min}</span>
        <span>{value}</span>
        <span>{max}</span>
      </div>
    </div>
  );
};

export default SliderComponent;
