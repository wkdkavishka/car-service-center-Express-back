import mongoose, { Schema, Document, Model } from 'mongoose';

// Define the TypeScript interface for the Car document
interface Car extends Document {
    owner: string;
    car_model: string;
    car_numberplate: string;
    job_status?: boolean;
    job_progress?: number;
}

// Define the schema for the Car model
const CarSchema: Schema<Car> = new Schema(
    {
        owner: { type: String, required: true },
        car_model: { type: String, required: true },
        car_numberplate: { type: String, required: true },
        job_status: { type: String, required: true },
        job_progress: { type: Number, required: true },
    },
    { timestamps: true }
);

// Creating the model
const Car: Model<Car> = mongoose.model<Car>('Car', CarSchema);

export default Car;
