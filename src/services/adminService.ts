import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import Admin from '../models/admin/adminModel';

const adminService = {

  // Find an admin by username
  async findAdminByUsername(username: string) {
    try {
      const admin = await Admin.findOne({ username }).select('+password');
      return admin;
    } catch (error) {
        if (error instanceof Error) {
          // Log the error for debugging purposes
          console.error(`Error finding admin: ${error.message}`);
          throw new Error(`Error finding admin: ${error.message}`);
        } else {
          // Handle unexpected error types
          console.error('Unexpected error:', error);
          throw new Error('Unexpected error occurred');
        }
    }
  }
};

export default adminService;
