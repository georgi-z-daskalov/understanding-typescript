import { Project, ProjectStatus } from "../models/project";
class State {
    constructor() {
        this.listeners = [];
        this.addListener = (listener) => {
            this.listeners.push(listener);
        };
    }
}
export class ProjectState extends State {
    constructor() {
        super();
        this.projects = [];
        this.addProject = (title, description, people) => {
            const newProject = new Project(Math.random().toString(), title, description, people, ProjectStatus.ACTIVE);
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
export const projectState = ProjectState.getInstance();
