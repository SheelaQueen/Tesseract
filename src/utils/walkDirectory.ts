import * as fs from "fs";
import * as path from "path";

const walkDirectory = (directory: string) => {
  const filepaths: string[] = [];

  (function walk(directory: string) {
    const files = fs.readdirSync(directory);

    for (const file of files) {
      const filepath = path.join(directory, file);

      if (fs.statSync(filepath).isDirectory()) walk(filepath);
      else filepaths.push(filepath);
    }
  })(directory);

  return filepaths;
};

export default walkDirectory;
