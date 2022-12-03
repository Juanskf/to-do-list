import React, { useContext, useReducer, useRef, useState } from "react";
import { Context } from "./TaskContext";
import { FiArrowRight } from "react-icons/fi";
import { HiTrash } from "react-icons/hi";

import styled from "styled-components";
import { saveLocalStorage } from "../utils/localStorage";

const Form = styled.form`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const Input = styled.input`
	height: 30px;
	width: 240px;
	outline: none;
	padding-left: 10px;
	border: none;
	border-radius: 10px 0px 0px 10px;
	border: 1px solid var(--main);
	border-right: 0px;
	color: gray;
`;

const SendButton = styled.button`
	height: 30px;
	width: 30px;
	margin: 0px -15px;
	border: none;
	color: var(--background);
	background-color: gray;
	border-radius: 30%;
	cursor: pointer;
`;

const TrashButton = styled.button`
	height: 30px;
	width: 30px;
	margin: 0px 20px;
	border-radius: 30%;
	color: var(--background);
	background-color: gray;
	border: none;
`;

const Trash = styled(HiTrash)`
	margin: 5px;
	font-size: 20px;
	cursor: pointer;
`;

const InputContainer = styled.div`
	padding: 20px;
	display: flex;
`;

const Error = styled.small`
	color: red;
	text-align: center;
	margin-bottom: 10px;
`;

function TaskForm() {
	const keys = new Date();
	const taskRef = useRef();
	const { tasks, setTasks } = useContext(Context);

	const reducer = (state, action) => {
		switch (action.type) {
			case "addTask":
				state = [...tasks, { id: keys.getTime(), title: action.title }];
				saveLocalStorage(state);
				setTasks(state);
				return state;
			default:
				return state;
		}
	};

	const [task, dispatch] = useReducer(reducer, tasks);

	const [valid, setValid] = useState(true);
	const [error, setError] = useState("");

	const checkTask = () => {
		let isValid;
		const task = taskRef.current.value;
		if (task.length === 0) {
			isValid = false;
			setError("No podemos agregar tareas vacias.");
		} else if (tasks.some((tasks) => tasks.title === task)) {
			isValid = false;
			setError("Esa tarea ya existe.");
		} else {
			isValid = true;
		}
		setValid(isValid);
		return isValid;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!checkTask()) return;

		dispatch({
			type: "addTask",
			title: taskRef.current.value,
		});

		taskRef.current.value = "";
	};

	const removeAll = () => {
		if (!window.confirm("¿Seguro que desea eliminar todas las tareas?")) return;
		saveLocalStorage([]);
		setTasks([]);
	};

	return (
		<Form onSubmit={handleSubmit}>
			<InputContainer>
				<Input type="text" placeholder="Hacer la tarea..." name="task" ref={taskRef} />
				<SendButton type="submit">
					<FiArrowRight />
				</SendButton>
				<TrashButton type="button" onClick={removeAll}>
					<Trash />
				</TrashButton>
			</InputContainer>
			{!valid && <Error>{error}</Error>}
		</Form>
	);
}

export default TaskForm;
