import React, { useState } from "react"
import './style.css';
import {InputTodo} from "./components/InputTodo";
import {IncompleteTodos} from "./components/IncompleteTodos";
import {CompleteTodos} from "./components/CompleteTodos";

export const App = () => {
  //todoの内容をstateで保持
  const [todoText, settodoText] = useState('')
  //未完了のtodoの内容をstateで保持
  const [incompleteTodos, setincompleteTodos] = useState([
  ])
  //完了済のtodoの内容をstateで保持
  const [completeTodos, setcompleteTodos] = useState([
  ])

  //イベントを検知すると、stateのtodoTextを変更する関数
  const onChangeTodoText = (event) => settodoText(event.target.value);
  //todoTextの内容を未完了リストに入れ、todoTextを初期化する関数
  const onClickAdd = () =>{
    if (todoText === "") return;
    const newTodos = [...incompleteTodos, todoText];
    setincompleteTodos(newTodos);
    settodoText("");
  }
  //indexを受け取り、そのindexで指定されたtodoを未完了リストから完了済リストへ
  const onClickComplete= (index) => {
    const newIncompleteTodos = [...incompleteTodos];
    newIncompleteTodos.splice(index,1);
    const newCompleteTodos = [...completeTodos, incompleteTodos[index]];

    setincompleteTodos(newIncompleteTodos);
    setcompleteTodos(newCompleteTodos)
  }
  //indexを受け取り、そのindexで指定されたtodoを削除
  const onClickDelete = (index) => {
    const newTodos = [...incompleteTodos];
    newTodos.splice(index,1);
    setincompleteTodos(newTodos);
  }
  //indexを受け取り、そのindexで指定されたtodoを完了済リストから未完了リストへ
  const onClickBack = (index) => {
    const newCompleteTodos = [...completeTodos]
    newCompleteTodos.splice(index,1)

    const newIncompleteTodos = [...incompleteTodos, completeTodos[index]];
    setincompleteTodos(newIncompleteTodos);
    setcompleteTodos(newCompleteTodos);
  }


  return (
    <>
      <InputTodo todoText={todoText} onChange={onChangeTodoText} onClick={onClickAdd} disabled={incompleteTodos.length >= 5}/>
      {incompleteTodos.length >= 5 && (
        <p style={{color: 'red'}}>上限は５個！</p>
      )}
      <IncompleteTodos todos={incompleteTodos} onClickComplete={onClickComplete} onClickDelete={onClickDelete}/>
      <CompleteTodos todos={completeTodos} onClick={onClickBack}/>
    </>
  );
}

