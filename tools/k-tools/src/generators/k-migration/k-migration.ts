/* eslint-disable @typescript-eslint/no-unused-vars */
import { getProjects, Tree, updateJson } from '@nx/devkit';
import { join } from 'path';

export default function update(host: Tree) {
  const projects = getProjects(host);

  projects.forEach((project, name) => {
    if (project.projectType === 'application') {
      const path = join(project.sourceRoot, 'items.json');

      updateJson(host, path, (json) => {
        return json.map((item) => ({
          ...item,
          newProperty: "newValue",
        }));
      });
    }
  });
}
