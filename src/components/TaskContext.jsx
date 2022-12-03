import { createContext, useState } from "react";
import { taskList } from "../utils/localStorage";

export const Context = createContext();

export const TaskContext = ({ children }) => {
	const [tasks, setTasks] = useState([...taskList]);
	return <Context.Provider value={{ tasks, setTasks }}>{children}</Context.Provider>;
};
