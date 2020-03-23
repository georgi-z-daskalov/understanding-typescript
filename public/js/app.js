"use strict";
const autobind = (_, _2, descriptor) => {
    const originalMethod = descriptor.value;
    const adjDecriptor = {
        configurable: true,
        get() {
            const bounded = originalMethod.bind(this);
            return bounded;
        }
    };
    return adjDecriptor;
};
var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus[ProjectStatus["ACTIVE"] = 0] = "ACTIVE";
    ProjectStatus[ProjectStatus["FINISHED"] = 1] = "FINISHED";
})(ProjectStatus || (ProjectStatus = {}));
class Project {
    constructor(id, title, description, people, status) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.people = people;
        this.status = status;
    }
}
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
            const newProject = new Project(Math.random().toString(), title, description, people, ProjectStatus.ACTIVE);
            this.projects.push(newProject);
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
const projectState = ProjectState.getInstance();
const validate = (validatableInput) => {
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
class ProjectItem extends Component {
    constructor(hostId, project) {
        super('single-project', hostId, false, project.id);
        this.configure = () => { };
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
class ProjectList extends Component {
    constructor(type) {
        super('project-list', 'app', false, `${type}-projects`);
        this.type = type;
        this.renderProjects = () => {
            const list = document.getElementById(`${this.type}-projects-list`);
            list.innerHTML = '';
            this.assignedProjects.forEach((project) => {
                new ProjectItem(this.element.querySelector('ul').id, project);
            });
        };
        this.configure = () => {
            projectState.addListener((projects) => {
                const relevantProjects = projects.filter(project => {
                    if (this.type === 'active') {
                        return project.status === ProjectStatus.ACTIVE;
                    }
                    return project.status === ProjectStatus.FINISHED;
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
class ProjectInput extends Component {
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
            if (validate(titleValidate) &&
                validate(descriptionValidate) &&
                validate(peopleValidate)) {
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
                projectState.addProject(title, description, people);
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
const projectInput = new ProjectInput();
const activeProjectList = new ProjectList('active');
const finishedProjectList = new ProjectList('finished');
