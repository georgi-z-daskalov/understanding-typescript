namespace App {
    type Listener<T> = (items: T[]) => void;
    
    class State<T> {
        protected listeners: Listener<T>[] = [];
    
        public addListener = (listener: Listener<T>) => {
            this.listeners.push(listener);
        }
    }
    
    export class ProjectState extends State<Project>{
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

    export const projectState = ProjectState.getInstance();
}