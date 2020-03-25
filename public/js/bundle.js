define("components/base-component", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
    exports.Component = Component;
});
define("util/validation", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.validate = (validatableInput) => {
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
});
define("models/project", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ProjectStatus;
    (function (ProjectStatus) {
        ProjectStatus[ProjectStatus["ACTIVE"] = 0] = "ACTIVE";
        ProjectStatus[ProjectStatus["FINISHED"] = 1] = "FINISHED";
    })(ProjectStatus = exports.ProjectStatus || (exports.ProjectStatus = {}));
    class Project {
        constructor(id, title, description, people, status) {
            this.id = id;
            this.title = title;
            this.description = description;
            this.people = people;
            this.status = status;
        }
    }
    exports.Project = Project;
});
define("state/project-state", ["require", "exports", "models/project"], function (require, exports, project_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
                const newProject = new project_1.Project(Math.random().toString(), title, description, people, project_1.ProjectStatus.ACTIVE);
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
    exports.ProjectState = ProjectState;
    exports.projectState = ProjectState.getInstance();
});
define("components/project-input", ["require", "exports", "components/base-component", "util/validation", "state/project-state"], function (require, exports, base_component_1, validation_1, project_state_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ProjectInput extends base_component_1.Component {
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
                if (validation_1.validate(titleValidate) &&
                    validation_1.validate(descriptionValidate) &&
                    validation_1.validate(peopleValidate)) {
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
                    project_state_1.projectState.addProject(title, description, people);
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
    exports.ProjectInput = ProjectInput;
});
define("models/drag-drop", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("components/project-item", ["require", "exports", "components/base-component"], function (require, exports, base_component_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ProjectItem extends base_component_2.Component {
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
    exports.ProjectItem = ProjectItem;
});
define("components/project-list", ["require", "exports", "components/base-component", "models/project", "state/project-state", "components/project-item"], function (require, exports, base_component_3, project_2, project_state_2, project_item_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ProjectList extends base_component_3.Component {
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
                project_state_2.projectState.moveProject(projectId, this.type === 'active' ? project_2.ProjectStatus.ACTIVE : project_2.ProjectStatus.FINISHED);
            };
            this.dragLeaveHandler = (_event) => {
                const listEl = this.element.querySelector('ul');
                listEl.classList.remove('droppable');
            };
            this.renderProjects = () => {
                const list = document.getElementById(`${this.type}-projects-list`);
                list.innerHTML = '';
                this.assignedProjects.forEach((project) => {
                    new project_item_1.ProjectItem(this.element.querySelector('ul').id, project);
                });
            };
            this.configure = () => {
                this.element.addEventListener('dragover', this.dragOverHandler);
                this.element.addEventListener('drop', this.dropHandler);
                this.element.addEventListener('dragleave', this.dragLeaveHandler);
                project_state_2.projectState.addListener((projects) => {
                    const relevantProjects = projects.filter(project => {
                        if (this.type === 'active') {
                            return project.status === project_2.ProjectStatus.ACTIVE;
                        }
                        return project.status === project_2.ProjectStatus.FINISHED;
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
    exports.ProjectList = ProjectList;
});
define("app", ["require", "exports", "components/project-input", "components/project-list"], function (require, exports, project_input_1, project_list_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    new project_input_1.ProjectInput();
    new project_list_1.ProjectList('active');
    new project_list_1.ProjectList('finished');
});
