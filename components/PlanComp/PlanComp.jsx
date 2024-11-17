"use client";
import { useState } from "react";
import CustomButton from "../CustomButton/CustomButton";
import { TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { createTheme, ThemeProvider } from "@mui/material";

export default function PlanComp() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [error, setError] = useState("");

  const handleDateChange = (newStart, newEnd) => {
    // Проверка, чтобы конец периода не был раньше начала
    if (newStart && newEnd && dayjs(newEnd).isBefore(dayjs(newStart))) {
      setError("Конец периода не может быть раньше начала.");
    } else {
      setError(""); // Очистка ошибки
      setStartDate(newStart);
      setEndDate(newEnd);
    }
  };

  const theme = createTheme({
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(214, 141, 21, 1)",
            },
          },
        },
      },
    },
  });

  return (
    <>
      <div className="container mb-[230px] md:mb-0">
        <h1 className="text-customOrange text-[26px] font-bold mb-5 sm:text-center md:text-left">
          План Инвестиций
        </h1>

        <div className="flex items-center gap-5 flex-wrap md:flex-nowrap">
          <div className="flex flex-col gap-5 w-full md:w-auto">
            <div className="flex flex-wrap md:flex-nowrap items-center justify-center md:justify-normal gap-5">
              <input
                className="bg-customWhite p-5 rounded-[10px] w-full md:w-[347px]"
                type="text"
                placeholder="Введите сумму"
              />

              <ThemeProvider theme={theme}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Начало периода"
                    value={startDate}
                    onChange={(newValue) => handleDateChange(newValue, endDate)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            "&:hover fieldset": { borderColor: "red" },
                            "&.Mui-focused fieldset": { borderColor: "red" },
                          },
                          "& .MuiInputBase-input": {
                            borderRadius: "10px",
                            backgroundColor: "#fff",
                          },
                        }}
                      />
                    )}
                    inputFormat="DD MM YYYY"
                  />
                  <DatePicker
                    label="Конец периода"
                    value={endDate}
                    onChange={(newValue) =>
                      handleDateChange(startDate, newValue)
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            "&:hover fieldset": { borderColor: "red" },
                            "&.Mui-focused fieldset": { borderColor: "red" },
                          },
                          "& .MuiInputBase-input": {
                            borderRadius: "10px",
                            backgroundColor: "#fff",
                          },
                        }}
                      />
                    )}
                    inputFormat="DD MM YYYY"
                  />
                </LocalizationProvider>
              </ThemeProvider>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <CustomButton
              text="Оставить заявку на вложение средств"
              customClass="bg-customGray hidden md:block w-full text-white"
            />
          </div>
          <div className="border  rounded-[10px] shadow-sm px-5 items-center md:items-start py-10 md:w-[347px] flex flex-col w-full gap-5">
            <p>Потенциальная прибыль:</p>
            <p className="text-customGray font-bold text-3xl">1 000 000₽</p>
          </div>
          <CustomButton
            text="Оставить заявку на вложение средств"
            customClass="bg-customGray block md:hidden w-full text-white"
          />
        </div>
      </div>
    </>
  );
}
