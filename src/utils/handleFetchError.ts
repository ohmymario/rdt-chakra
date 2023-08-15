import { FirestoreError } from "firebase/firestore";

// Handle common errors from Firestore
// Turn them into human-readable strings
const firestoreSwitch = (error: FirestoreError): string => {
  switch (error.code) {
    case 'cancelled':
      return 'The operation was cancelled.';
    case 'unknown':
      return 'An unknown error occurred. Please try again.';
    case 'invalid-argument':
      return 'There was an error with the query. Please check your parameters.';
    case 'deadline-exceeded':
      return 'The operation took too long to complete. Please try again.';
    case 'not-found':
      return 'The requested data was not found.';
    case 'permission-denied':
      return 'You do not have permission to access this data.';
    case 'resource-exhausted':
      return 'System resources were exhausted. Please try again later.';
    case 'failed-precondition':
      return 'A precondition was not met.';
    case 'aborted':
      return 'The operation was aborted. Please try again.';
    case 'out-of-range':
      return 'A parameter was out of range.';
    case 'unimplemented':
      return 'The operation is not implemented or not supported.';
    default:
      return 'An unexpected Firestore error occurred.';
  }
};

export const handleFetchError = (error: unknown): string => {

  // error from firestore
  if (error instanceof FirestoreError) {
    return firestoreSwitch(error);
  }

  // error from fetch
  if (error instanceof Error) {
    return error.message;
  }

  // error from unknown source
  return 'An unknown error occurred.';
};