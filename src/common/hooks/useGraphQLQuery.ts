import { useQuery, useLazyQuery, QueryResult } from '@apollo/client';
import getHeaders from '@common/utilities/get-headers';

const useGraphQLQuery = <TData, TVariables>(
  query: any,
  variables?: any
): QueryResult<TData, TVariables> => {
  const options = {
    ...variables,
    fetchPolicy: 'no-cache',
    notifyOnNetworkStatusChange: true,
    context: {
      headers: getHeaders(),
    },
  };
  return useQuery<TData, TVariables>(query, options);
};

const useGraphQLLazyQuery = <TData>(query: any) => {
  const options: any = {
    variables: {},
    fetchPolicy: 'no-cache',
    notifyOnNetworkStatusChange: true,
    context: {
      headers: getHeaders(),
    },
  };
  return useLazyQuery<TData>(query, options);
};

export default useGraphQLQuery;
export { useGraphQLLazyQuery };
