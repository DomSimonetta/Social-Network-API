const User = require('../models/User');

module.exports = {
    async getUsers(req, res) {
      try {
        const users = await User.find();
        res.json(users);
      } catch (err) {
        res.status(500).json(err);
      }
    },

    async getSingleUser(req, res) {
      try {
        const user = await User.findOne({ _id: req.params.userId })
          .select('-__v');
  
        if (!user) {
          return res.status(404).json({ message: 'No user with that ID' });
        }
  
        res.json(user);
      } catch (err) {
        res.status(500).json(err);
      }
    },

    async createUser(req, res) {
      try {
        const dbUserData = await User.create(req.body);
        res.json(dbUserData);
      } catch (err) {
        res.status(500).json(err);
      }
    },

    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
            { _id: req.params.usertId },
            { $set: req.body },
            { runValidators: true, new: true }
            );

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID'});
            }
            res.json(user);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndRemove(
                { _id: req.params.thoughtId }
            );
            if (!user) {
                return res.status(404).json({ message: 'No user with that ID'});
            } 
            res.json({ message: 'User has been deleted' });
        } catch (err) {
          res.status(500).json(err);
    }
},

    async addFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { responses: req.body } },
            { runValidators: true, new: true }
            );
            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
},

    async removeFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { reactions: { responseId: req.params.responseId } } },
                { runValidators: true, new: true }
      )
      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }

    },
};