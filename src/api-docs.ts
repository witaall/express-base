import path from 'path';
import fs from 'fs';

export function mergeJsonFiles(folder: string) {
  const mergedContent = {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'A sample API documentation',
    },
    paths: {},
    components: {},
  };

  const items = fs.readdirSync(folder);
  items.forEach(item => {
    const itemPath = path.join(folder, item);
    const stats = fs.statSync(itemPath);

    if (stats.isDirectory()) {
      const subFolderContent = mergeJsonFiles(itemPath);
      Object.assign(mergedContent.paths, subFolderContent.paths);
      Object.assign(mergedContent.components, subFolderContent.components);
    } else if (path.extname(itemPath) === '.json') {
      const content = fs.readFileSync(itemPath, 'utf8');
      const jsonContent = JSON.parse(content);
      Object.assign(mergedContent.paths, jsonContent.paths);
      Object.assign(mergedContent.components, jsonContent.components);
    }
  });

  return mergedContent;
}
