const isValidPassword = (password: string) => {
  const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).+$/;
  return regex.test(password)
}

export default isValidPassword
