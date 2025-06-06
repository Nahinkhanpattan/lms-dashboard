import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { FaUser, FaClock, FaReply } from 'react-icons/fa';
import { format } from 'date-fns';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

export default function DoubtBox() {
  const { user } = useAuth();
  const [doubts, setDoubts] = useState([
    {
      id: '1',
      question: 'How do React hooks work internally?',
      student: 'Jane Doe',
      course: 'Advanced React Patterns',
      lesson: 'Understanding Hooks',
      createdAt: '2025-03-15T10:00:00Z',
      status: 'pending',
      replies: []
    },
    {
      id: '2',
      question: 'Can you explain the virtual DOM concept?',
      student: 'John Smith',
      course: 'React Fundamentals',
      lesson: 'React Architecture',
      createdAt: '2025-03-14T15:30:00Z',
      status: 'answered',
      replies: [
        {
          id: '1',
          content: 'The virtual DOM is a lightweight copy of the actual DOM...',
          author: 'Dr. React',
          createdAt: '2025-03-14T16:00:00Z'
        }
      ]
    }
  ]);

  const [newReply, setNewReply] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);

  const handleReply = (doubtId) => {
    if (!newReply.trim()) return;

    const reply = {
      id: Date.now().toString(),
      content: newReply,
      author: user.name,
      createdAt: new Date().toISOString()
    };

    setDoubts(prev => prev.map(doubt => {
      if (doubt.id === doubtId) {
        return {
          ...doubt,
          status: 'answered',
          replies: [...doubt.replies, reply]
        };
      }
      return doubt;
    }));

    setNewReply('');
    setReplyingTo(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Student Doubts</h1>

      <div className="space-y-6">
        {doubts.map(doubt => (
          <Card key={doubt.id}>
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{doubt.question}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mt-2">
                    <div className="flex items-center">
                      <FaUser className="mr-1" />
                      {doubt.student}
                    </div>
                    <div>{doubt.course}</div>
                    <div>{doubt.lesson}</div>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  doubt.status === 'pending' 
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-green-100 text-green-800'
                }`}>
                  {doubt.status === 'pending' ? 'Pending' : 'Answered'}
                </span>
              </div>

              {doubt.replies.length > 0 && (
                <div className="pl-6 border-l-2 space-y-4 mt-4">
                  {doubt.replies.map(reply => (
                    <div key={reply.id} className="bg-gray-50 p-4 rounded">
                      <p className="text-gray-800">{reply.content}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mt-2">
                        <div className="flex items-center">
                          <FaUser className="mr-1" />
                          {reply.author}
                        </div>
                        <div className="flex items-center">
                          <FaClock className="mr-1" />
                          {format(new Date(reply.createdAt), 'MMM d, yyyy h:mm a')}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {replyingTo === doubt.id ? (
                <div className="mt-4">
                  <textarea
                    value={newReply}
                    onChange={(e) => setNewReply(e.target.value)}
                    placeholder="Write your reply..."
                    className="w-full p-3 border rounded focus:ring-primary focus:border-primary"
                    rows="3"
                  />
                  <div className="flex justify-end space-x-3 mt-2">
                    <Button
                      variant="secondary"
                      onClick={() => {
                        setReplyingTo(null);
                        setNewReply('');
                      }}
                    >
                      Cancel
                    </Button>
                    <Button onClick={() => handleReply(doubt.id)}>
                      Submit Reply
                    </Button>
                  </div>
                </div>
              ) : (
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => setReplyingTo(doubt.id)}
                >
                  <FaReply className="mr-2" />
                  Reply
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}