const User = require('../models/User');
const Thought = require('../models/Thought')

module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
          }
    },

    async getSingleThought(req, res) {
        try {
          const thought = await thought.findOne({ _id: req.params.thoughtId })
    
          if (!thought) {
            return res.status(404).json({ message: 'No thought with that ID' });
          }
    
          res.json(thought);
        } catch (err) {
          res.status(500).json(err);
        }
    },

    async createThought(req, res) {
        try {
          const thought = await thought.create(req.body);
          await User.findOneAndUpdate(
            { _id: req.body.userId },
            { $addToSet: { thought: thought._id } },
            { new: true }
          );
          res.json('Created new Thought');
        } catch (err) {
          console.log(err);
          res.status(500).json(err);
        }
      },

      async updateThought(req, res) {
        try {
          const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
          );
    
          if (!thought) {
            return res.status(404).json({ message: 'No thought with that ID' });
          }
          res.json(thought);
        } catch (err) {
          console.log(err);
          res.status(500).json(err);
        }
      },

      async deleteThought(req, res) {
        try {
          const thought = await Thought.findOneAndRemove(
            { _id: req.params.thoughtId });
    
          if (!thought) {
            return res.status(404).json({ message: 'No thought with that ID' });
          }
    
          const user = await User.findOneAndUpdate(
            { thoughts: req.params.thoughtId },
            { $pull: { thoughts: req.params.thoughtId } },
            { new: true }
          );
    
          res.json({ message: 'Thought has been deleted' });
        } catch (err) {
          res.status(500).json(err);
        }
      },

      async addReaction(req, res) {
        try {
          const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { responses: req.body } },
            { runValidators: true, new: true }
          );
    
          if (!thought) {
            return res.status(404).json({ message: 'No thought with that ID' });
          }
          res.json(thought);
        } catch (err) {
          res.status(500).json(err);
        }
      },
      
      async removeReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
        { $pull: { reactions: { responseId: req.params.responseId } } },
        { runValidators: true, new: true }
      )
      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
      },
    };