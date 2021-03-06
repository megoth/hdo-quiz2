import { Enum } from '../enum';

const ManuscriptEntryType = Enum.strEnum([
  'button',
  'electoralGuide',
  'promises',
  'quick_reply',
  'random',
  'text',
  'vg_categories',
  'vg_questions'
]);

type ManuscriptEntryType = keyof typeof ManuscriptEntryType;
export {ManuscriptEntryType};
