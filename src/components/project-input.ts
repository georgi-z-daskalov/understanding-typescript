import { Component } from "./base-component";
import { IValidateInput, validate } from "../util/validation";
import { projectState } from "../state/project-state";

export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement>{
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
