import { React, useContext } from "react";
import { Context } from "./TaskContext";
import { HiTrash } from "react-icons/hi";
import styled from "styled-components";
import { saveLocalStorage } from "../utils/localStorage";

const TaskContainer = styled.div`
	height: 50px;
	width: 400px;
	margin: 5px;
	display: flex;
	border-radius: 8px;
	font-weight: 700;
	justify-content: space-between;
	background-color: gray;
`;

const SubContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 5px;
`;

const TaskText = styled.p`
	font-size: 16px;
	margin-bottom: 2px;
	color: var(--background);
`;

const Trash = styled(HiTrash)`
	margin: 5px;
	font-size: 20px;
	color: var(--background);
	cursor: pointer;
`;

function Task(props) {
	const { tasks, setTasks } = useContext(Context);

	const handleRemove = () => {
		const filteredTask = tasks.filter((task) => props.id !== task.id);
		setTasks(filteredTask);
		saveLocalStorage(filteredTask);
	};

	return (
		<TaskContainer>
			<SubContainer>
				<Trash onClick={handleRemove} />
				<TaskText>{props.title}</TaskText>
			</SubContainer>
		</TaskContainer>
	);
}

export default Task;
