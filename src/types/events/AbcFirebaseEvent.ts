/**
 * Firebase events which effect state for the `abc` module
 */
export const enum AbcFirebaseEvent {
  firebase_connect = 'firebase_connect',
  firebase_disconnect = 'firebase_disconnect',
  // TODO: determine whether to bring in AUTH or not
  firebase_login = 'firebase_login',
  firebase_logout = 'firebase_logout',
}
