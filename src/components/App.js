import React from "react";
import { TaskContext } from "./TaskContext";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import Title from "./Title";
import styled from "styled-components";

const AppContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

function App() {
	return (
		<AppContainer>
			<Title />
			<TaskContext>
				<TaskForm />
				<TaskList />
			</TaskContext>
		</AppContainer>
	);
}

export default App;
