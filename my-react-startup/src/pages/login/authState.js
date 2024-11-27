export class AuthState {
  static Unknown = new AuthState('unknown');
  static Authenticated = new AuthState('authenticated');
  static Unauthenticated = new AuthState('unauthenticated');

  constructor(name) {
    this.name = name;
  }
}

// Adding a function to determine the current state based on user presence
authState.getCurrentAuthState = (user) => {
  if (!user) {
    return AuthState.Unauthenticated;
  }
  return AuthState.Authenticated;
};

export default authState;
