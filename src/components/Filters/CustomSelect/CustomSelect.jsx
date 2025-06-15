import { useState, useRef, useEffect } from "react";
import css from "./CustomSelect.module.css";
import propertyActive from "../../../assets/property-active.svg";
import propertyDefault from "../../../assets/property-default.svg";

export const CustomSelect = ({ options, onSelect, selected, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className={css.selectContainer} ref={containerRef}>
      <div className={css.selected} onClick={() => setIsOpen(!isOpen)}>
        {selected || placeholder}
        <span className={css.arrow}>
          {isOpen ? (
            <img src={propertyActive} />
          ) : (
            <img src={propertyDefault} />
          )}
        </span>
      </div>
      {isOpen && (
        <ul className={css.dropdown}>
          {options.map((option) => (
            <li
              key={option}
              className={`${css.option} ${
                option === selected ? css.active : ""
              }`}
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
