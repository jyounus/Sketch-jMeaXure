import { render } from "./render";
import { ProjectData } from "./common";

declare global {
    interface Window {
        jmeaxure: { render: (data: ProjectData) => void };
    }
}

window.jmeaxure = {
    render: render,
}
