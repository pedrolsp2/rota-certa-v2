import { router, RelativePathString, ExternalPathString } from 'expo-router';

export const goTo = (path: RelativePathString | ExternalPathString) => {
  router.replace(path);
};
