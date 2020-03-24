/// <reference path="base-component.ts" />
/// <reference path="../models/project.ts" />

namespace App {
    export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements IDraggable {
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
}