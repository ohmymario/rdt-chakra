export const validateCommunityName = (communityName: string): string | null => {
  var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

  if (format.test(communityName)) {
    return 'Community names can only contain letters and numbers';
  }

  if (communityName.length < 3) {
    return 'Community names must be at least 3 characters long';
  }

  if (communityName.length > 21) {
    return 'Community names must be less than 21 characters long';
  }

  return null;
};
