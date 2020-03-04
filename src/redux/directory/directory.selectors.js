import { createSelector } from 'reselect';

const sectionsDirectory = (state) => state.directory;

export const selectDirectorySections = createSelector(
  [sectionsDirectory],
  (directory) => directory.sections,
);
