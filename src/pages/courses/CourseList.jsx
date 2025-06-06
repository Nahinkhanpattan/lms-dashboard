import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaPlus, FaBook, FaUser, FaStar } from 'react-icons/fa';
import CourseCard from '../../components/courses/CourseCard';

export default function CourseList() {
  const { user } = useAuth();
  const [courses] = useState([
    {
      id: '1',
      title: 'Complete Web Development Bootcamp',
      description: 'Learn web development from scratch to advanced level',
      thumbnail: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg',
      instructor: 'John Smith',
      duration: '40 hours',
      lessons: 48,
      enrolled: 1234,
      rating: 4.5
    },
    {
      id: '2',
      title: 'Advanced React Patterns',
      description: 'Master advanced React patterns and best practices',
      thumbnail: 'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg',
      instructor: 'Jane Doe',
      duration: '20 hours',
      lessons: 24,
      enrolled: 856,
      rating: 4.8
    }
  ]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Courses</h1>
        {user?.role === 'instructor' && (
          <Link
            to="/courses/create"
            className="flex items-center px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
          >
            <FaPlus className="mr-2" />
            Create Course
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}