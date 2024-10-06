import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWorkersAction } from '../../redux/reducer/workersReducer'; // Correct path to the slice
import { RootState, AppDispatch } from '../../redux/store/store'; // Ensure proper store paths

const WorkersList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { workers, loading, error } = useSelector((state: RootState) => state.workers);

  useEffect(() => {
    dispatch(fetchWorkersAction()); // Dispatch the correct action from the slice
  }, [dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Workers List</h1>
      <ul>
        {workers.map(worker => (
          <li key={worker.id}>{worker.id}</li>
        ))}
      </ul>
    </div>
  );
};

export default WorkersList;
