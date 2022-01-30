
import { useEffect, useState } from 'react';
import { useDispatch, useStore } from 'react-redux';
import { getUsers } from './actions/users.actions';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});

  useEffect(()=>{
    dispatch(getUsers({
      setLoading,
      setError
    }))
  },[])
  return (
    <div className="bg-slate-400 p-3 max-w-fit">
      <h1 className="text-3xl font-bold text-primary-300">Hello world!</h1>
      <h1 className="text-3xl font-bold text-primary-500">Hello world!</h1>
      <h1 className="text-3xl font-bold text-primary-700">Hello world!</h1>

      <h1 className="text-3xl font-bold text-secondary-300">Hello world!</h1>
      <h1 className="text-3xl font-bold text-secondary-500">Hello world!</h1>
      <h1 className="text-3xl font-bold text-secondary-700">Hello world!</h1>

      <h1 className="text-3xl font-bold text-gray-50">Hello world!</h1>
      <h1 className="text-3xl font-bold text-gray-200">Hello world!</h1>
      <h1 className="text-3xl font-bold text-gray-500">Hello world!</h1>

    </div>
  );
}

export default App;
