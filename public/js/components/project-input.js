import { Component } from "./base-component";
import { validate } from "../util/validation";
import { projectState } from "../state/project-state";
export class ProjectInput extends Component {
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
