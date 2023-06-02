import Handlebars from 'handlebars';
import fs from 'fs';

interface ITemplateVariable {
  [key: string]: string | number;
}

interface IPaserMailTemplate {
  file: string;
  variables: ITemplateVariable;
}

class HandlebarsMailTemplate {
  public async parser({
    file,
    variables,
  }: IPaserMailTemplate): Promise<string> {
    const templateFileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });

    const parseTemplate = Handlebars.compile(templateFileContent);
    return parseTemplate(variables);
  }
}

export default HandlebarsMailTemplate;
