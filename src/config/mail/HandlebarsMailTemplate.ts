import Handlebars from 'handlebars';

interface ITemplateVariable {
  [key: string]: string | number;
}

interface IPaserMailTemplate {
  template: string;
  variables: ITemplateVariable;
}

class HandlebarsMailTemplate {
  public async parser({
    template,
    variables,
  }: IPaserMailTemplate): Promise<string> {
    const parseTemplate = Handlebars.compile(template);
    return parseTemplate(variables);
  }
}

export default HandlebarsMailTemplate;
