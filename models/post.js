const mongoose = require('mongoose');

const Schema  = mongoose.Schema;

const postSchema = new Schema({
	title: { type: 'String', required: true },
	text: { type: 'String', required: true },
	author: { type: 'String', required: true },
	votes: {type: 'Number', required:true }
})


postSchema.methods.toJSON = function() {
	return {
		_id: this._id,
		title: this.title,
		text: this.text,
		author: this.author,
		votes: this.votes,
		createdAt: this.createdAt,
		updatedAt: this.updatedAt,
	};
};

module.exports = mongoose.model('Post', postSchema);
