import { Connection } from "mongoose";

// Define the global variable for Mongoose connection
declare global {
  var mongoose: {
    conn: Connection | null;
    promise: Promise<Connection> | null;
  };
}

// Export empty object to avoid TypeScript errors
// This is necessary to ensure that the global variable is recognized
export {};
