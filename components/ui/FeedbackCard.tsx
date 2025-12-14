import { Feedback } from '@/lib/types';

interface FeedbackCardProps {
  feedback: Feedback;
}

export default function FeedbackCard({ feedback }: FeedbackCardProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <span
        key={index}
        className={index < rating ? 'text-yellow-400' : 'text-gray-300'}
      >
        ★
      </span>
    ));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-primary-500">
      <div className="flex items-start space-x-4">
        <div className="text-4xl">{feedback.userIcon}</div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-bold text-gray-900">{feedback.userName}</h4>
            <div className="flex items-center space-x-1 text-sm">
              {renderStars(feedback.rating)}
            </div>
          </div>
          <p className="text-gray-700 mb-2">{feedback.comment}</p>
          <p className="text-sm text-gray-500">
            {new Date(feedback.date).toLocaleDateString('fr-FR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
      </div>
    </div>
  );
}

