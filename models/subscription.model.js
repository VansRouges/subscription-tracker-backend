import mongoose from 'mongoose'

const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Subscription Name is required'],
        trim: true,
        maxlength: [100, 'Subscription Name cannot exceed 100 characters']
    },
    price: {
        type: Number,
        required: [true, 'Subscription Price is required'],
        min: [0, 'Subscription Price cannot be negative']
    },
    currency:{
        type: String,
        enum: ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD'],
        default: 'USD',
    }, 
    frequency: {
        type: String,
        enum: ['daily', 'weekly', 'monthly', 'yearly'],
    },
    category: {
        type: String,
        enum: ['entertainment', 'utilities', 'food', 'health', 'education', 'other'],
        required: [true, 'Subscription Category is required']
    },
    paymentMethod: {
        type: String,
        enum: ['credit_card', 'paypal', 'bank_transfer'],
        required: [true, 'Payment Method is required']
    },
    status: {
        type: String,
        enum: ['active', 'expired', 'cancelled'],
        default: 'active'
    },
    startDate: {
        type: Date,
        required: [true, 'Start Date is required'],
        validate: (value) => value <= new Date(),
        message: 'Start Date must be in the past or present'
    },
    renewalDate: {
        type: Date,
        validate: function (value) {
            return value > this.startDate;
        },
        message: 'Renewal Date must be after the Start Date'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User ID is required'],
        index: true
    }
}, { timestamps: true })

//auto-calculate renewal date
subscriptionSchema.pre('save', function (next) {
    if(!this.renewalDate) {
        const renewalPeriods = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365,
        }

        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
    }

    if(this.renewalDate < new Date()) {
        this.status = 'expired';
    }

    next();
})

const Subscription = mongoose.model('Subscription', subscriptionSchema)

export default Subscription