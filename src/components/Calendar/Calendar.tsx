import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionCreator as dateActions } from "../../store/modules/date";
import { actionCreator as todolistActions } from "../../store/modules/todolist";
import { RootState } from "../../store/rootReducer";
import ViewComponent from "./ViewComponent";

export default function Calendar() {
  let date: Date = new Date();
  let today: number = date.getDate();
  let [currentMonth, setCurrentMonth] = useState<number>(date.getMonth());
  let [currentYear, setCurrentYear] = useState<number>(date.getFullYear());
  const fixMonth: number = date.getMonth();
  const fixYear: number = date.getFullYear();
  const dispatch = useDispatch();

  const selectCalendar = (
    currentDay: number,
    currentWeek: number,
    currentMonth: number,
    currentYear: number
  ) =>
    dispatch(
      dateActions.Select(currentDay, currentWeek + 1, currentMonth, currentYear)
    );
  //날짜별 todolist를 달력에 그려준다.
  useEffect(() => {
    dispatch(todolistActions.DayTodoList(currentMonth, currentYear));
  }, [currentMonth, currentYear]);

  const { dayTodos } = useSelector((state: RootState) => ({
    dayTodos: state.todolist.dayTodos
  }));

  //다음달로 이동한다.
  const next = (): void => {
    setCurrentYear(currentMonth === 11 ? currentYear + 1 : currentYear);
    setCurrentMonth((currentMonth + 1) % 12);
  };
  //이전달로 이동한다.
  const previous = (): void => {
    setCurrentYear(currentMonth === 0 ? currentYear - 1 : currentYear);
    setCurrentMonth(currentMonth === 0 ? 11 : currentMonth - 1);
  };
  return (
    <ViewComponent
      today={today}
      currentMonth={currentMonth}
      currentYear={currentYear}
      fixMonth={fixMonth}
      fixYear={fixYear}
      next={next}
      previous={previous}
      selectCalendar={selectCalendar}
      dayTodos={dayTodos}
    ></ViewComponent>
  );
}
