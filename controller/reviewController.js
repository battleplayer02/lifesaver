const newPlanModel = require("../model/planModel");
const reviewModel = require("../model/reviewModel");
const factory = require("../utility/factory");

// // createReview, getAllReviews, getReview , update review ,delete review=> db work  
module.exports.deleteReviewww = async (req, res) => {
    try {
        const review = await reviewModel.findByIdAndDelete(req.body.id);
        console.log(review);
        if (!review) {
            return res.status(404).json({
                status: 404,
                message: "Review not found"
            });
        }
        return res.status(200).json({
            status: 200,
            message: "Review deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Internal server error"
        });
    }
};

module.exports.createReview = async function createReview(req, res) {
    try {
        const id = req.body.plan;
        let plan = await newPlanModel.find({
            where: {
                _id: id
            }
        });
        plan.ratingsAverage = (plan.ratingsAverage + req.body.rating) / 2;
        await plan.save();
        const review = await reviewModel.create(req.body);
        res.status(201).json({
            review
        })
    } catch (err) {
        res.status(200).json({
            err: err.message
        })
    }
}

// async function getAllReviews(req, res) {
//   try {
//     const reviews = await reviewModel.find()
//     res.status(201).json({
//       reviews
//     })
//   } catch (err) {
//     res.status(200).json({
//       err: err.message
//     })
//   }
// }

module.exports.getPlanReviews = async (req, res) => {
    try {
        let reviews = await reviewModel.find({
        })
        reviews = reviews.filter(ele => ele.plan._id == req.params.id)

        // const reviews = data.filter(review => review.plan._id == req.params.id);
        res.status(201).json({
            reviews
        })

    } catch (err) {
        res.status(200).json({
            err: err.message
        })
    }
}


module.exports.top3reviews = async (req, res) => {
    // res.send("djasknl")
    try {
        const reviews = await reviewModel.find().limit(3).sort({
            rating: -1
        });

        res.status(201).json({
            reviews,
            success: 1
        })
    } catch (err) {
        res.status(400).json({
            err: err.message
        })
    }
}

module.exports.rateAReview = async (req, res) => {
    try {
        const review = await reviewModel.find({
            where: {
                id: req.params.id,
            }
        });
        review.rating = req.body.rate;
        await review.save();
        res.status(201).json({
            review
        })
    } catch (err) {
        res.status(200).json({
            err: err.message
        })
    }
}




module.exports.getReview = factory.getElement(reviewModel);
module.exports.getAllReviews = factory.getAllElement(reviewModel);
module.exports.updateReview = factory.updateElement(reviewModel);
// module.exports.c = factory.deleteElement(reviewModel);
// module.exports.createReview = factory.createElement(reviewModel);