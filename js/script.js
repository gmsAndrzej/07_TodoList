{
    let tasks = [];

    const removeTask = (taskIndex) => {
        tasks=[
            ...tasks.slice(0,taskIndex),
            ...tasks.slice(taskIndex+1),
        ];
        render();
    }

    const toggleTaskDone = (taskIndex) => {
        tasks=[
            ...tasks.slice(0,taskIndex),
            {
                ...tasks[taskIndex],
                done: !tasks[taskIndex].done,
            },
            ...tasks.slice(taskIndex+1),
        ];

        render();

    }

    const addNewTask = (newTaskContent) => {
        tasks=[...tasks,{content:newTaskContent}];

        render();
    }

    const bindRemoveEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {

                removeTask(index);
            });
        });

    }

    const bindToggleDoneEvents = () => {
        const toggleDoneButtons = document.querySelectorAll(".js-toggleDone");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {

                toggleTaskDone(index);
            });
        });
    }

    const render = () => {

        let tasksListHTMLContent = "";

        for (const task of tasks) {
            tasksListHTMLContent += `
            <li class="tasks__item js-tasks">
            <button class="tasks__button tasks__button--done js-toggleDone"> ${task.done ? "✔️" : ""} </button>
            <span class="tasks__content ${task.done ? " tasks__content--done" : ""}">${task.content} </span>
            <button class="tasks__button tasks__button--remove js-remove" > 🗑️ </button>
            </li>
            `;
        }
        document.querySelector(".js-tasks").innerHTML = tasksListHTMLContent;
        bindRemoveEvents();
        bindToggleDoneEvents();
    };

    const onFormSubmint = (event) => {
        event.preventDefault();

        const newTaskElement = document.querySelector(".js-newTask");
        const newTaskContent = newTaskElement.value.trim();
        if (newTaskContent !== "") {
            addNewTask(newTaskContent);
            newTaskElement.value = "";
        }
        newTaskElement.focus();
   };
   
   const init = () => {
        render();
        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmint)
    };
    init();
}
