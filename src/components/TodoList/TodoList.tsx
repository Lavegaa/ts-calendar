import React, { useState, useEffect, SyntheticEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionCreator as todolistActions } from "../../store/modules/todolist";
import { RootState } from "../../store/rootReducer";
import styled from "styled-components";
import TodoHead from "./ViewComponent/TodoHead";
import TodoCreate from "./ViewComponent/TodoCreate";
import TodoItemList from "./ViewComponent/TodoItemList";

const TodoTemplateBlock = styled.div`
  display: flex;
  position: relative; /* 추후 박스 하단에 추가 버튼을 위치시키기 위한 설정 */
  width: 25%;
  height: 82vh;
  margin: 20px;
  padding: 20px;
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);
  flex-direction: column;
`;

export default function TodoList() {
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  let {
    id,
    filteredTodos,
    currentDay,
    currentMonth,
    currentYear,
    currentWeek
  } = useSelector((state: RootState) => ({
    id: state.todolist.id,
    filteredTodos: state.todolist.filteredTodos,
    currentDay: state.date.currentDay,
    currentMonth: state.date.currentMonth,
    currentYear: state.date.currentYear,
    currentWeek: state.date.currentWeek
  }));
  //
  const todos = (
    currentDay: number,
    currentMonth: number,
    currentYear: number
  ) => dispatch(todolistActions.Todos(currentDay, currentMonth, currentYear));

  const dayTodoList = (currentMonth: number, currentYear: number) =>
    dispatch(todolistActions.DayTodoList(currentMonth - 1, currentYear));

  useEffect(() => {
    dispatch(todos(currentDay, currentMonth, currentYear));
  }, [currentDay, currentMonth, currentYear]);

  //TodoItemList Component에 들어갈 함수들
  //todoItem의 done여부를 toggle한다.
  const handleItemToggle = (id: number): void => {
    //toggle action으로 done을 수정, 업데이트 된 todo를 가져오고 캘린더에 ToDay와 DoDay를 수정한다.
    dispatch(todolistActions.ToggleTodo(id));
    dispatch(todos(currentDay, currentMonth, currentYear));
    dispatch(dayTodoList(currentMonth, currentYear));
  };
  //TodoItem을 삭제한다.
  const handleItemRemove = (id: number): void => {
    //remove action을 통해 해당 item을 삭제하고, 업데이트 된 todo를 가져오고 캘린더에 ToDay와 DoDay를 수정한다.
    dispatch(todolistActions.RemoveTodo(id));
    dispatch(todos(currentDay, currentMonth, currentYear));
    dispatch(dayTodoList(currentMonth, currentYear));
  };
  //TodoCreate Component에 들어갈 함수들
  //TodoInput을 관리한다.
  const handleCreateToggle = (): void => {
    setOpen(!open);
  };
  //Input에서의 값을 업데이트 해준다.
  const handleCreateChange = (e: React.FormEvent<HTMLInputElement>): void =>
    setValue(e.currentTarget.value);
  //생성될 todo의 객체
  const todo = {
    id: id,
    year: currentYear,
    month: currentMonth,
    day: currentDay,
    text: value,
    done: false
  };
  //입력된 정보를 바탕으로 todo를 생성한다.
  const handleCreateSubmit = (e: SyntheticEvent) => {
    //create action을 통해 todo를 생성하고, 업데이트 된 todo를 가져오고 캘린더에 ToDay와 DoDay를 수정한다.
    e.preventDefault(); //새로고침 방지
    dispatch(todolistActions.CreateTodo(todo));
    dispatch(todos(currentDay, currentMonth, currentYear));
    dispatch(dayTodoList(currentMonth, currentYear));
    //작업이 끝난 후 value값을 초기화 하고 input창을 닫는다.
    setValue("");
    setOpen(false);
  };
  return (
    <TodoTemplateBlock>
      <TodoHead
        currentDay={currentDay}
        currentMonth={currentMonth}
        currentYear={currentYear}
        currentWeek={currentWeek}
        filteredTodos={filteredTodos}
      />
      <TodoItemList
        filteredTodos={filteredTodos}
        handleItemToggle={handleItemToggle}
        handleItemRemove={handleItemRemove}
      />
      <TodoCreate
        open={open}
        value={value}
        handleChange={handleCreateChange}
        handleSubmit={handleCreateSubmit}
        handleToggle={handleCreateToggle}
      />
    </TodoTemplateBlock>
  );
}
