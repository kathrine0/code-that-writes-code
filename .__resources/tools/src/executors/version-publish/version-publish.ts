import { ExecutorContext, PromiseExecutor } from '@nx/devkit';
import { VersionPublishExecutorSchema } from './schema';
import { execSync } from 'child_process';

const runExecutor: PromiseExecutor<VersionPublishExecutorSchema> = async (
  options: VersionPublishExecutorSchema, context: ExecutorContext
) => {
  console.log(`Executor ran for VersionPublish for ${context.projectName} with options:`, options);

  try {
    execSync(`nx release version --specifier=${options.specifier} --projects=${context.projectName}`, {
      stdio: 'inherit',
      cwd: process.cwd(),
    });

    execSync(`npm publish ${options.buildPath}`, {
      stdio: 'inherit',
      cwd: process.cwd(),
    });

  } catch (error) {
    console.error('Error during version publish:', error);
    return {
      success: false,
    };
  }

  return {
    success: true,
  };
};

export default runExecutor;
