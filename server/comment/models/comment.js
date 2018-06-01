var mongoose = require('mongoose');
var Schema  = mongoose.Schema;

var dbSchema = new Schema({
	postId: {
		type: String,
		required: true
	},
	comment: {
		type: String,
		required: true
	},
	created_by: {
		type: mongoose.Schema.ObjectId,
		required: true
	}, 
	created_on: {
		type: Date,
        required: true,
        default: new Date()
	}
});
    
var Comments = mongoose.model('Comments', dbSchema);

Comments.getComments = function (qry) {
	const qObj = getQuery(qry);
	
	return Comments.aggregate(qObj);
}

function getQuery(qry) {
	const query = [{
		$match: {
			postId: qry.postId
		}
	}, {
		$lookup: {
			from: "users",
			localField: "created_by",
			foreignField: "_id",
			as: "author"
		}
	}, {
		$project: {
			"created_by": 1,
			"postId": 1,
			"comment": 1,				
			"author.name": 1,
			"created_on": 1
		}
	}];	

	return query;
}

module.exports = {Comments};