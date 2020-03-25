import { Component } from "./base-component";
export class ProjectItem extends Component {
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
