const router = require('express').Router
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction
  } = require('../../controllers/thoughtController');
  
  router.route('/')
    .get(getThoughts)
    .post(createThought);

  router.route('/:reactionId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);

  router.route('/:reactionId/reaction/:reactionId')
  .post(addReaction)
  .delete(removeReaction);
  
  module.exports = router;