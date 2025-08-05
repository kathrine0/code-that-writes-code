/* eslint-disable @typescript-eslint/no-unused-vars */
import { getProjects, Tree, updateJson } from '@nx/devkit';
import { join } from 'path';

export default function update(host: Tree) {
  const projects = getProjects(host);

  projects.forEach((project, name) => {
    if (project.projectType === 'library') {
      const path = join(project.root, 'items.json');

      updateJson(host, path, (json) => {
        return {
          ...json,
          newProperty: "newValue",
        };
      });
    }
  });
}
