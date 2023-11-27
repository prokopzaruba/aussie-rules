import { useQuery } from '@tanstack/react-query';
import Axios from 'axios';

// round is a part of key
const useFetch = (url: string, key: string, round: number) => {
  const { data, error, refetch, isLoading } = useQuery(
    [key, round],
    async () => {
      const res = await Axios.get(url);
      return res.data;
    }
  );

  if (error) {
    console.log(error);
  }

  return { data, refetch, isLoading };
};

export default useFetch;
