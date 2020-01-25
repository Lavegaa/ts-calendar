import React from "react";
import styled from "styled-components";
import TodoItem from "../TodoItem";
import { TodosData } from "../../../../store/modules/todolist";

const TodoListBlock = styled.div`
  flex: 1;
  padding: 20px 32px;
  padding-bottom: 48px;
  overflow-y: auto;
`;

const StyledText = styled.div`
  margin-top: 70px;
  text-align: center;
  font-weight: 700;
`;

interface TodoItemProps {
  filteredTodos: TodosData[];
  handleItemToggle: (id: number) => void;
  handleItemRemove: (id: number) => void;
}

export default function TodoItemList({
  filteredTodos,
  handleItemToggle,
  handleItemRemove
}: TodoItemProps) {
  return (
    <TodoListBlock>
      {filteredTodos && filteredTodos.length ? (
        filteredTodos.map(todo => (
          <TodoItem
            key={todo.id}
            id={todo.id}
            text={todo.text}
            done={todo.done}
            handleToggle={handleItemToggle}
            handleRemove={handleItemRemove}
          />
        ))
      ) : (
        <StyledText>아직 할일이 없어요.</StyledText>
      )}
    </TodoListBlock>
  );
}

TodoItemList.defaultProps = {
  filteredTodos: {},
  handleItemToggle: () => {
    console.log("handleItemToggle is null");
  },
  handleItemRemove: () => {
    console.log("handleItemRemove is null");
  }
};
