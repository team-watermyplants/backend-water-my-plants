const checkCredentials = (req, res, next) => {
  const { email, password } = req.body
  if (!email.trim() || email.length > 50) {
    return next(new Error('email is required (max 50 char)'))
  }
  if (!password.trim() || password.length > 20 || password.length < 5) {
    return next(new Error('password is required (5-20 characters)'))
  }

  next()
}

module.exports = checkCredentials
