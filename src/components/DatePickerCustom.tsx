import React, { useState } from "react";
import Datepicker from "tailwind-datepicker-react";
import moment from "moment";

const options: any = {
  title: "Календарь задач",
  autoHide: true,
  todayBtn: true,
  todayBtnText: "Выбрать сегодня",
  clearBtn: false,
  maxDate: new Date("2030-01-01"),
  minDate: new Date("2024-01-01"),
  datepickerClassNames: "top-12",
  defaultDate: new Date(),
  language: "ru",
  disabledDates: [],
  weekDays: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
  inputNameProp: "date",
  inputIdProp: "date",
  inputPlaceholderProp: "Select Date",
  inputClassName: {
    left: 0,
  },
  inputDateFormatProp: {
    day: "numeric",
    month: "long",
    year: "numeric",
  },
};

const DatePickerCustom = ({ setDateNow }: any) => {
  const [show, setShow] = useState<boolean>(false);
  const handleChange = (selectedDate: Date) => {
    setDateNow(moment(selectedDate).format("DD-MM-YYYY"));
  };
  const handleClose = (state: boolean) => {
    setShow(state);
  };

  return (
    <Datepicker
      options={options}
      onChange={handleChange}
      show={show}
      setShow={handleClose}
    />
  );
};

export default DatePickerCustom;
