import { clone, escapeRegExp } from 'lodash';

export default function showComment(input: string) {
  let text = clone(input);

  const tags = text.match(/@\{\{[^\}]+\}\}/gi) || [];

  tags.map((myTag: string) => {
    const tagData = myTag.slice(3, -2);
    const tagDataArray = tagData.split('||');
    const tagDisplayValue = tagDataArray[2];
    text = text.replace(new RegExp(escapeRegExp(myTag), 'gi'), tagDisplayValue);
  });

  return text;
}
