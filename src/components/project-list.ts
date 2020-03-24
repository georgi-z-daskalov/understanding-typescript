/// <reference path="base-component.ts" />
/// <reference path="project-item.ts" />
/// <reference path="../models/project.ts" />
/// <reference path="../state/project-state.ts" />

namespace App {
    export class ProjectList extends Component<HTMLDivElement, HTMLElement> implements IDroppable{
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
}