import mongoose from 'mongoose';

const awardSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    dateReceived: {
        type: Date,
        required: true
    },
    displayOrder: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

export default mongoose.model('Award', awardSchema);
