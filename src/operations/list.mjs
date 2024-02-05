import { readdir } from 'fs/promises';
import { cwd } from 'process';

import { tryAsyncAction } from '../helpers/common.mjs';

export async function list() {
    async function actionList() {
        const path = cwd();
        const content = await readdir(path, { withFileTypes: true });
        const direcories = content.filter(el => el.isDirectory());
        const files = content.filter(el => el.isFile());
        console.table([
            ...createElementsArray(direcories, 'directory'),
            ...createElementsArray(files, 'file')]
        );
    }
    await tryAsyncAction(actionList);
}

class Element {
    constructor(name, type) {
        this.name = name;
        this.type = type;
    }
}

function createElementsArray(arr, type) {
    return arr.sort().map(el => new Element(el.name, type));
}