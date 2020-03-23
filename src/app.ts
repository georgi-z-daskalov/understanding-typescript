
const autobind = (_: any, _2: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;
    const adjDecriptor: PropertyDescriptor = {
        configurable: true,
        get() {
            const bounded = originalMethod.bind(this);
            return bounded;
        }
    }

    return adjDecriptor;
}

interface IDraggable {
    dragStart(event: DragEvent): void;
    dragEnd(event: DragEvent): void;
}

interface IDroppable {
    dragOverHandler(event: DragEvent): void;
    dropHandler(event: DragEvent): void;
    dragLeaveHandler(event: DragEvent): void;
}

enum ProjectStatus{
    ACTIVE,
    FINISHED
}

class Project{
    constructor(public id: string, public title: string, public description: string, public people: number, public status: ProjectStatus) {
    }
}

type Listener<T> = (items: T[]) => void;

class State<T> {
    protected listeners: Listener<T>[] = [];

    public addListener = (listener: Listener<T>) => {
        this.listeners.push(listener);
    }
}
class ProjectState extends State<Project>{
    private projects: Project[] = [];
    private static instance: ProjectState;

    private constructor() {
        super();
    }

    static getInstance() {
        if (this.instance) {
            return this.instance;
        }

        this.instance = new ProjectState();
        return this.instance;
    }

    public addProject = ( title: string, description: string, people: number) => {
        const newProject = new Project(Math.random().toString(), title, description, people, ProjectStatus.ACTIVE) 

        this.projects.push(newProject);
        this.updateListeners();
    }

    public moveProject = (projectId: string, newStatus: ProjectStatus) => {
        const project = this.projects.find(pr => projectId === pr.id);
        if (project && project.status !== newStatus) {
            project.status = newStatus;
            this.updateListeners();
        }
    }

    private updateListeners = () => {
        this.listeners.forEach(listener => {
            listener(this.projects.slice());
        })
    }
}

const projectState = ProjectState.getInstance();

interface IValidateInput {
    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
}

const validate = (validatableInput: IValidateInput) => {
    let isValid = true;
    
    if (validatableInput.required) {
        isValid = isValid && validatableInput.value.toString().trim().length > 0
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
}

abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    templateElement: HTMLTemplateElement;
    hostElement: T;
    element: U;

    constructor(templateId: string, hostElementId: string, insertAtStart: boolean, newElementId?: string) {
        this.templateElement = document.getElementById(templateId)! as HTMLTemplateElement;
        this.hostElement = document.getElementById(hostElementId)! as T;

        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild as U;
        if (newElementId) {
            this.element.id = newElementId;
        }

        this.attach(insertAtStart);
    }

    private attach = (isAtStart: boolean) => {
        this.hostElement.insertAdjacentElement(isAtStart ? 'afterbegin' : 'beforeend', this.element)
    }

    protected abstract configure(): void
    protected abstract renderContent(): void
}

class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements IDraggable {
    private project: Project;
    get persons() {
        if(this.project.people === 1) {
            return '1 person'
        }
        return `${this.project.people} persons`
    }
    
    constructor(hostId: string, project: Project) {
        super('single-project', hostId, false, project.id);
        this.project = project;

        this.configure();
        this.renderContent();
    }

    public dragStart = (event: DragEvent) => {
        event.dataTransfer!.setData('text/plain', this.project.id);
        event.dataTransfer!.effectAllowed = 'move';
    };

    public dragEnd = (_event: DragEvent) => {
        console.log('dragend');
    }

    protected configure = () => {
        this.element.addEventListener('dragstart', this.dragStart);
        this.element.addEventListener('dragend', this.dragEnd);
    }
    
    protected renderContent = () => {
        this.element.querySelector('h2')!.textContent = this.project.title;
        this.element.querySelector('h3')!.textContent = `${this.persons} assigned`;
        this.element.querySelector('p')!.textContent = this.project.description;
    }
}

class ProjectList extends Component<HTMLDivElement, HTMLElement> implements IDroppable{
    assignedProjects: Project[];

    constructor(private type: 'active' | 'finished') {
        super('project-list', 'app', false, `${type}-projects`);
        this.assignedProjects = [];

        this.configure();
        this.renderContent();
    }

    public dragOverHandler = (event: DragEvent) => {
        if (event.dataTransfer?.types[0] === 'text/plain') {
            event.preventDefault();
            const listEl = this.element.querySelector('ul')!
            listEl.classList.add('droppable');
        }
    }

    public dropHandler = (event: DragEvent) => {
        const projectId = event.dataTransfer!.getData('text/plain');
        projectState.moveProject(projectId, this.type === 'active' ? ProjectStatus.ACTIVE : ProjectStatus.FINISHED)
        console.log("dropEvent", event.dataTransfer!.getData('text/plain'))
    }
    public dragLeaveHandler = (_event: DragEvent) => {

        const listEl = this.element.querySelector('ul')!
        listEl.classList.remove('droppable');
    }

    private renderProjects = () => {
        const list = document.getElementById(`${this.type}-projects-list`)! as HTMLUListElement;
        list.innerHTML = '';
        this.assignedProjects.forEach((project: Project) => {
            new ProjectItem(this.element.querySelector('ul')!.id, project);
        });
    }

    protected configure = () => {
        this.element.addEventListener('dragover', this.dragOverHandler);
        this.element.addEventListener('drop', this.dropHandler);
        this.element.addEventListener('dragleave', this.dragLeaveHandler);
        projectState.addListener((projects: Project[]) => {
            const relevantProjects = projects.filter(project => {
                if(this.type === 'active') {
                   return project.status === ProjectStatus.ACTIVE
                }
                return project.status === ProjectStatus.FINISHED;
            })
            this.assignedProjects = relevantProjects;
            this.renderProjects();
        })
    }

    protected renderContent = () => {
        const listId = `${this.type}-projects-list`;
        this.element.querySelector('ul')!.id = listId;
        this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS';
    }
}

class ProjectInput extends Component<HTMLDivElement, HTMLFormElement>{
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    constructor() {
        super('project-input', 'app', true, 'user-input');
        this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
        this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement;
        this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement;

        this.configure();
    }

    protected configure = () => {
        this.element.addEventListener('submit', this.submitHandler)
    }

    protected renderContent = () => {}

    private getUserInput = (): [string, string, number] | void => {
        const titleValue = this.titleInputElement.value;
        const descriptionValue = this.descriptionInputElement.value;
        const peopleValue = +this.peopleInputElement.value;

        const titleValidate: IValidateInput = {
            value: titleValue,
            required: true
        };
        const descriptionValidate: IValidateInput = {
            value: descriptionValue,
            required: true,
            minLength: 5
        };
        const peopleValidate: IValidateInput = {
            value: peopleValue,
            min: 1,
            max: 5
        }

        if(
            validate(titleValidate) &&
            validate(descriptionValidate) &&
            validate(peopleValidate)
        ) {
            return [titleValue, descriptionValue, +peopleValue]
        } else {
            console.log('invalid input!');
            return;
        }
    }

    private submitHandler = (event: Event) => {
        event.preventDefault();
        const userInput = this.getUserInput();
        if (Array.isArray(userInput)) {
            const [title, description, people] = userInput;
            projectState.addProject(title, description, people);
            this.clearInputs();
        }
    }

    private clearInputs = () => {
        this.titleInputElement.value = '';
        this.descriptionInputElement.value = '';
        this.peopleInputElement.value = '';
    }
}

const projectInput = new ProjectInput();
const activeProjectList = new ProjectList('active');
const finishedProjectList = new ProjectList('finished');
