// Inspired by Udacity Git Commit Message Style Guide
// https://udacity.github.io/git-styleguide/

module.exports = {
  types: [
    { value: 'feat', name: 'feat: A new feature' },
    { value: 'fix', name: 'fix: A bug fix' },

    { value: 'docs', name: 'docs: Changes to documentation' },
    {
      value: 'style',
      name: 'style: Formatting, missing semi colons, etc; no code change',
    },
    {
      value: 'refactor',
      name: 'refactor: Refactoring production code',
    },
    {
      value: 'test',
      name: 'test: Adding tests, refactoring test; no production code change',
    },
    {
      value: 'chore',
      name: 'chore: Updating build tasks, package manager configs, etc; no production code change',
    },
    {
      value: 'merge',
      name: 'merge: Merging branches',
    },
    { value: 'revert', name: 'revert: Revert to a commit' },
  ],

  // override the messages, defaults are as follows
  messages: {
    type: "Select the type of change that you're committing:",
    subject: 'Write a SHORT, IMPERATIVE tense description of the change:\n',
    body: 'Provide a LONGER description of the change (optional). Use "|" to break new line:\n',
    footer: 'List ISSUES affected by this change (optional). E.g.: #31, #34:\n',
    confirmCommit: 'Are you sure you want to proceed with the above commit?',
  },

  allowCustomScopes: true,
  allowBreakingChanges: ['feat', 'fix'],
  skipQuestions: ['scope', 'breaking'],
  allowTicketNumber: false,
  footerPrefix: 'Refs: ',

  subjectLimit: 100,
  upperCaseSubject: true,
};
