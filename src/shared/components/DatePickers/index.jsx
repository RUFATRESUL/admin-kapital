
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import { Calendar } from "../../../assets/svgs";

const StyledDatePicker = styled(DatePicker)`
  width: 100%;
  height: 40px;
  border-radius: var(--space-x1);
  border: none;
  padding: 7px 24px;
  padding-left: 40px;
  color: #495673;
  background: #f5f5f8;
`;

const StyledDiv = styled.div`
  position: relative;
  width: 180px;
  svg {
    position: absolute;
    margin-top: -31px;
    display: block;
    width: 20px;
    height: 20px;
    left: 31px;
    margin-right: 12px;
  }
`;

const DatePickers = ({ id, value, setValue, name, maxDate, minDate }) => {
  const [startDate, setStartDate] = React.useState(null);
  const handleChange = (date, name) => {
    if (date) {
      let convertDate = new Date(
        date.getTime() - date.getTimezoneOffset() * 60000
      ).toISOString();
      convertDate = convertDate.split("T")[0];
      setStartDate(date);
      setValue(name, convertDate);
    } else {
      setStartDate("");
      setValue(name, "");
    }
  };

  return (
    <StyledDiv className="date-picker">
      <StyledDatePicker
        dateFormat="yyyy-MM-dd"
        showMonthDropdown
        showYearDropdown
        placeholderText="Bütün tarix"
        onChange={(date) => handleChange(date, name)}
        minDate={minDate}
        maxDate={maxDate}
        selected={startDate}
        value={value}
        id={id}
        name={name}
      />
      <Calendar />
    </StyledDiv>
  );
};

export default DatePickers;
