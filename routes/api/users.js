const express   = require('express');
const router    = express.Router();

// User Model
const User = require('../../models/User');

// @route  POST api/users
// @desc   Add A New User
// @access Public
router.post('/', (req,res) => {

    const newUser = new User({
        name        : req.body.name,
        contactNo   : req.body.contactNo,
        gender      : req.body.gender
    });
        
    newUser.save().then(user => res.json(user));

});

// @route  GET api/users
// @desc   GET All Users
// @access Public
router.get('/', (req,res) => {
    User.find()
    .sort({name: 1})
    .then(users => res.json(users))
});

// @route  GET api/users/:id
// @desc   GET A User By Id
// @access Public
router.get('/:id', (req,res) => {
    User.findById(req.params.id)
    .then(users => res.json(users))
});

// @route   UPDATE api/users/update/:id
// @desc    Update A User's ContactNo
// @access  Private
router.put('/update/:id', (req,res) => {
    
    const newData = {
        contactNo : req.body.contactNo
    }

    User.findByIdAndUpdate(req.params.id, newData)
    .then(user => {
        if(user) {
            return res.json({msg: 'Update Successful!',
                user : {
                    name : user.name,
                    contactNo: user.contactNo
                }
            });
        }else {
            return res.json({msg: 'User does not exist!'})
        }
    })
    .catch(err => res.status(404).json({success: false}));
});

// @route   DELETE api/users/:id
// @desc    Delete A User
// @access  Public
router.delete('/:id', async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      if (!deletedUser) {
        return res.status(404).send('User not found');
      }
      res.send(`User with ID ${req.params.id} deleted`);
    } catch (error) {
      res.status(500).send(error.message);
    }
});
  
module.exports = router;