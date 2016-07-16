export default `
query($email: Email!, $password: Password!) {
  login(email: $email, password: $password) {
    user {
      id,
      email
    },
    authToken
  }
}
`;
