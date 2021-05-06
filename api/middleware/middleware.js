const User = require('../users/users-model');

function logger(req, res, next) {
  console.log(`
  ${req.method} request to ${req.baseUrl} endpoint!
  req.body ${JSON.stringify(req.body)}
  req.params.id ${req.params.id}`)
  next()
};

async function idChecker(req, res, next) {
  try{
    const user = await User.getById(req.params.id)
    if(!user) {
      next({ status:404, message: `hub with id ${req.params.id} not found!`})
    } else {
      console.log(user)
      req.user = user
      next()
    }
  } catch(err) {
    next(err)
  }
}

function validateUser(req, res, next) {
  if(!req.body.name) {
    res.status(400).json({message: 'missing required name'})
  } else {
    next()
  }
}

function validatePost(req, res, next) {
  if(!req.body.text || req.body.text === '') {
    res.status(400).json({ message: "missing required text" })
  } else {
    next()
  }
}

// do not forget to expose these functions to other modules
module.exports = {logger , idChecker, validateUser, validatePost};