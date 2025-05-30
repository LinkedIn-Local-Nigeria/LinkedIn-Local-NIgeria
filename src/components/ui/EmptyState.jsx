import { InfoCircledIcon } from '@radix-ui/react-icons';
import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';

const EmptyState = ({
  message = 'No data available',
  icon,
  className
}) => {
  return (
    <div className={twMerge(
      "flex flex-col items-center justify-center py-10 px-4 text-center",
      className
    )}>
       <div className='flex items-center justify-center w-12 h-12 rounded-full bg-gray-100'>
      {icon || <InfoCircledIcon className="w-6 h-6 text-[#0076B2]" />}
      </div>
      <p className="font-manrope text-gray-600 mt-2">{message}</p>
    </div>
  );
};

EmptyState.propTypes = {
  message: PropTypes.string,
  icon: PropTypes.node,
  className: PropTypes.string
};

export default EmptyState;
