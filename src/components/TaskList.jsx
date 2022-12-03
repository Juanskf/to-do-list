import { React, useContext } from "react";
import { Context } from "./TaskContext";
import Task from "./Task";
import styled from "styled-components";

const ListContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

function TaskList() {
	const { tasks } = useContext(Context);

	return (
		<ListContainer>
			{tasks.map((task) => {
				return <Task title={task.title} id={task.id} key={task.id} />;
			})}
		</ListContainer>
	);
}

export default TaskList;
