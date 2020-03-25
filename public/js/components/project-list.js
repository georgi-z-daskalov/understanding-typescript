import { Component } from "./base-component";
import { ProjectStatus } from "../models/project";
import { projectState } from "../state/project-state";
import { ProjectItem } from "./project-item";
export class ProjectList extends Component {
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
            projectState.moveProject(projectId, this.type === 'active' ? ProjectStatus.ACTIVE : ProjectStatus.FINISHED);
        };
        this.dragLeaveHandler = (_event) => {
            const listEl = this.element.querySelector('ul');
            listEl.classList.remove('droppable');
        };
        this.renderProjects = () => {
            const list = document.getElementById(`${this.type}-projects-list`);
            list.innerHTML = '';
            this.assignedProjects.forEach((project) => {
                new ProjectItem(this.element.querySelector('ul').id, project);
            });
        };
        this.configure = () => {
            this.element.addEventListener('dragover', this.dragOverHandler);
            this.element.addEventListener('drop', this.dropHandler);
            this.element.addEventListener('dragleave', this.dragLeaveHandler);
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
