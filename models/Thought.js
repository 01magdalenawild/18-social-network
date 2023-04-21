const { Schema, model } = require('mongoose');
const reactionschema=require('./Reaction.js');
// Schema to create Student model
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            max_length: 250,
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        username: { type: String, required: true },
    reactions: [
            reactionschema
        ],
        
    },
    {
        toJSON: {
            getters: true,
        },
    }
);

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
