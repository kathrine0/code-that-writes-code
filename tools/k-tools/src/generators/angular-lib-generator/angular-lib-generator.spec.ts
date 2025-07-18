import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree, readProjectConfiguration } from '@nx/devkit';

import { angularLibGeneratorGenerator } from './angular-lib-generator';
import { AngularLibGeneratorGeneratorSchema } from './schema';

describe('angular-lib-generator generator', () => {
  let tree: Tree;
  const options: AngularLibGeneratorGeneratorSchema = { name: 'test' };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await angularLibGeneratorGenerator(tree, options);
    const config = readProjectConfiguration(tree, 'test');
    expect(config).toBeDefined();
  });
});
