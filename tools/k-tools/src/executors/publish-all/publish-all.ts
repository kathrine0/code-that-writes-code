import { ExecutorContext, PromiseExecutor, runExecutor } from '@nx/devkit';
import { PublishAllExecutorSchema } from './schema';

const multipleExecutor: PromiseExecutor<PublishAllExecutorSchema> = async (
  options, context: ExecutorContext
) => {

  const result = await Promise.race([
    await runExecutor(
      { project: 'k-tools', target: 'version-publish' },
      { specifier: options.specifier },
      context
    ),
    await runExecutor(
      { project: 'create-workspace', target: 'version-publish' },
      { specifier: options.specifier },
      context
    ),
  ]);

  for await (const res of result) {
    if (!res.success) return res;
  }

  return { success: true };
};

export default multipleExecutor;
