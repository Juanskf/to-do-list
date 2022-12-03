export const saveLocalStorage = (taskList) => {
	localStorage.setItem("taskList", JSON.stringify(taskList));
};

export const taskList = JSON.parse(localStorage.getItem("taskList")) || [];
