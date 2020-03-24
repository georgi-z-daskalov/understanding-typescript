"use strict";
var App;
(function (App) {
    class Component {
        constructor(templateId, hostElementId, insertAtStart, newElementId) {
            this.attach = (isAtStart) => {
                this.hostElement.insertAdjacentElement(isAtStart ? 'afterbegin' : 'beforeend', this.element);
            };
            this.templateElement = document.getElementById(templateId);
            this.hostElement = document.getElementById(hostElementId);
            const importedNode = document.importNode(this.templateElement.content, true);
            this.element = importedNode.firstElementChild;
            if (newElementId) {
                this.element.id = newElementId;
            }
            this.attach(insertAtStart);
        }
    }
    App.Component = Component;
})(App || (App = {}));
var App;
(function (App) {
    let ProjectStatus;
    (function (ProjectStatus) {
        ProjectStatus[ProjectStatus["ACTIVE"] = 0] = "ACTIVE";
        ProjectStatus[ProjectStatus["FINISHED"] = 1] = "FINISHED";
    })(ProjectStatus = App.ProjectStatus || (App.ProjectStatus = {}));
    class Project {
        constructor(id, title, description, people, status) {
            this.id = id;
            this.title = title;
            this.description = description;
            this.people = people;
            this.status = status;
        }
    }
    App.Project = Project;
})(App || (App = {}));
var App;
(function (App) {
    class ProjectItem extends App.Component {
        constructor(hostId, project) {
            super('single-project', hostId, false, project.id);
            this.dragStart = (event) => {
                event.dataTransfer.setData('text/plain', this.project.id);
                event.dataTransfer.effectAllowed = 'move';
            };
            this.dragEnd = (_event) => {
                console.log('dragend');
            };
            this.configure = () => {
                this.element.addEventListener('dragstart', this.dragStart);
                this.element.addEventListener('dragend', this.dragEnd);
            };
            this.renderContent = () => {
                this.element.querySelector('h2').textContent = this.project.title;
                this.element.querySelector('h3').textContent = `${this.persons} assigned`;
                this.element.querySelector('p').textContent = this.project.description;
            };
            this.project = project;
            this.configure();
            this.renderContent();
        }
        get persons() {
            if (this.project.people === 1) {
                return '1 person';
            }
            return `${this.project.people} persons`;
        }
    }
    App.ProjectItem = ProjectItem;
})(App || (App = {}));
var App;
(function (App) {
    class State {
        constructor() {
            this.listeners = [];
            this.addListener = (listener) => {
                this.listeners.push(listener);
            };
        }
    }
    class ProjectState extends State {
        constructor() {
            super();
            this.projects = [];
            this.addProject = (title, description, people) => {
                const newProject = new App.Project(Math.random().toString(), title, description, people, App.ProjectStatus.ACTIVE);
                this.projects.push(newProject);
                this.updateListeners();
            };
            this.moveProject = (projectId, newStatus) => {
                const project = this.projects.find(pr => projectId === pr.id);
                if (project && project.status !== newStatus) {
                    project.status = newStatus;
                    this.updateListeners();
                }
            };
            this.updateListeners = () => {
                this.listeners.forEach(listener => {
                    listener(this.projects.slice());
                });
            };
        }
        static getInstance() {
            if (this.instance) {
                return this.instance;
            }
            this.instance = new ProjectState();
            return this.instance;
        }
    }
    App.ProjectState = ProjectState;
    App.projectState = ProjectState.getInstance();
})(App || (App = {}));
var App;
(function (App) {
    class ProjectList extends App.Component {
        constructor(type) {
            super('project-list', 'app', false, `${type}-projects`);
            this.type = type;
            this.dragOverHandler = (event) => {
                var _a;
                if (((_a = event.dataTransfer) === null || _a === void 0 ? void 0 : _a.types[0]) === 'text/plain') {
                    event.preventDefault();
                    const listEl = this.element.querySelector('ul');
                    listEl.classList.add('droppable');
                }
            };
            this.dropHandler = (event) => {
                const projectId = event.dataTransfer.getData('text/plain');
                App.projectState.moveProject(projectId, this.type === 'active' ? App.ProjectStatus.ACTIVE : App.ProjectStatus.FINISHED);
            };
            this.dragLeaveHandler = (_event) => {
                const listEl = this.element.querySelector('ul');
                listEl.classList.remove('droppable');
            };
            this.renderProjects = () => {
                const list = document.getElementById(`${this.type}-projects-list`);
                list.innerHTML = '';
                this.assignedProjects.forEach((project) => {
                    new App.ProjectItem(this.element.querySelector('ul').id, project);
                });
            };
            this.configure = () => {
                this.element.addEventListener('dragover', this.dragOverHandler);
                this.element.addEventListener('drop', this.dropHandler);
                this.element.addEventListener('dragleave', this.dragLeaveHandler);
                App.projectState.addListener((projects) => {
                    const relevantProjects = projects.filter(project => {
                        if (this.type === 'active') {
                            return project.status === App.ProjectStatus.ACTIVE;
                        }
                        return project.status === App.ProjectStatus.FINISHED;
                    });
                    this.assignedProjects = relevantProjects;
                    this.renderProjects();
                });
            };
            this.renderContent = () => {
                const listId = `${this.type}-projects-list`;
                this.element.querySelector('ul').id = listId;
                this.element.querySelector('h2').textContent = this.type.toUpperCase() + ' PROJECTS';
            };
            this.assignedProjects = [];
            this.configure();
            this.renderContent();
        }
    }
    App.ProjectList = ProjectList;
})(App || (App = {}));
var App;
(function (App) {
    App.validate = (validatableInput) => {
        let isValid = true;
        if (validatableInput.required) {
            isValid = isValid && validatableInput.value.toString().trim().length > 0;
        }
        if (validatableInput.minLength != null && typeof validatableInput.value === 'string') {
            isValid = isValid && validatableInput.value.length >= validatableInput.minLength;
        }
        if (validatableInput.maxLength != null && typeof validatableInput.value === 'string') {
            isValid = isValid && validatableInput.value.length <= validatableInput.maxLength;
        }
        if (validatableInput.min != null && typeof validatableInput.value === 'number') {
            isValid = isValid && validatableInput.value >= validatableInput.min;
        }
        if (validatableInput.max != null && typeof validatableInput.value === 'number') {
            isValid = isValid && validatableInput.value <= validatableInput.max;
        }
        return isValid;
    };
})(App || (App = {}));
var App;
(function (App) {
    class ProjectInput extends App.Component {
        constructor() {
            super('project-input', 'app', true, 'user-input');
            this.configure = () => {
                this.element.addEventListener('submit', this.submitHandler);
            };
            this.renderContent = () => { };
            this.getUserInput = () => {
                const titleValue = this.titleInputElement.value;
                const descriptionValue = this.descriptionInputElement.value;
                const peopleValue = +this.peopleInputElement.value;
                const titleValidate = {
                    value: titleValue,
                    required: true
                };
                const descriptionValidate = {
                    value: descriptionValue,
                    required: true,
                    minLength: 5
                };
                const peopleValidate = {
                    value: peopleValue,
                    min: 1,
                    max: 5
                };
                if (App.validate(titleValidate) &&
                    App.validate(descriptionValidate) &&
                    App.validate(peopleValidate)) {
                    return [titleValue, descriptionValue, +peopleValue];
                }
                else {
                    console.log('invalid input!');
                    return;
                }
            };
            this.submitHandler = (event) => {
                event.preventDefault();
                const userInput = this.getUserInput();
                if (Array.isArray(userInput)) {
                    const [title, description, people] = userInput;
                    App.projectState.addProject(title, description, people);
                    this.clearInputs();
                }
            };
            this.clearInputs = () => {
                this.titleInputElement.value = '';
                this.descriptionInputElement.value = '';
                this.peopleInputElement.value = '';
            };
            this.titleInputElement = this.element.querySelector('#title');
            this.descriptionInputElement = this.element.querySelector('#description');
            this.peopleInputElement = this.element.querySelector('#people');
            this.configure();
        }
    }
    App.ProjectInput = ProjectInput;
})(App || (App = {}));
var App;
(function (App) {
    const projectInput = new App.ProjectInput();
    const activeProjectList = new App.ProjectList('active');
    const finishedProjectList = new App.ProjectList('finished');
})(App || (App = {}));
